
// #include <emscripten/emscripten.h>
#include <emscripten/bind.h>
#include <emscripten/wasm_worker.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <math.h>
#include <vector>

using namespace emscripten;
using namespace std;

struct Generation {
  double bestFitness;
  int index;
};

double randomDouble(double lowerBound, double upperBound) {
  return lowerBound + static_cast<double>(rand()) / (static_cast<double>(RAND_MAX / (upperBound - lowerBound)));
}

int randomInt(int lowerBound, int upperBound) {
  return lowerBound + rand() % (upperBound - lowerBound + 1);
}

vector<vector<double>> generatePopulation(int populationSize, int dimensions, double upperBound, double lowerBound) {
  vector<vector<double>> population(populationSize);

  for (int i = 0; i < populationSize; i++) {
    vector<double> individual(dimensions);

    for (int j = 0; j < dimensions; j++) {
      double val = randomDouble(lowerBound, upperBound);

      individual[j] = val;
    }

    population[i] = individual;
  }

  return population;
}

double schwefel(const vector<double> &individual) {
  double result = 0;
  int dimensions = individual.size();

  for (int i = 0; i < dimensions; i++) {
    result += individual[i] * sin(sqrt(fabs(individual[i])));
  }

  return 418.9829 * dimensions - result;
}

vector<double> calculateFitness(const vector<vector<double>> &population) {
  vector<double> fitness;

  int populationSize = population.size();
  int dimensions = population[0].size();

  for (int i = 0; i < populationSize; i++) {
    double val = schwefel(population[i]);

    fitness.push_back(val);
  }

  return fitness;
}

vector<vector<double>> rouletteWheelSelection(
  const vector<vector<double>> &population,
  const vector<double> &fitness
) {
  int populationSize = population.size();

  double totalFitness = 0;
  vector<double> probabilities(populationSize);
  vector<double> cumulativeProbabilities(populationSize);

  for (int i = 0; i < populationSize; i++) {
    totalFitness += fitness[i];
  }

  for (int i = 0; i < populationSize; i++) {
    probabilities[i] = fitness[i] / totalFitness;
  }

  cumulativeProbabilities[0] = probabilities[0];

  for (int i = 1; i < populationSize; i++) {
    cumulativeProbabilities[i] = cumulativeProbabilities[i - 1] + probabilities[i];
  }

  vector<vector<double>> newPopulation(populationSize);

  for (int i = 0; i < populationSize; i++) {
    double val = randomDouble(0, 1);

    for (int j = 0; j < populationSize; j++) {
      if (val < cumulativeProbabilities[j]) {
        newPopulation[i] = population[j];
        break;
      }
    }
  }

  return newPopulation;
}

vector<vector<double>> onePointCrossover(const vector<double> &parent1, const vector<double> &parent2) {
  int dimensions = parent1.size();
  int indexToSwap = randomInt(0, dimensions - 1);

  vector<double> child1;
  vector<double> child2;

  for (int i = 0; i < dimensions; i++) {
    if (i < indexToSwap) {
      child1.push_back(parent1[i]);
      child2.push_back(parent2[i]);
    } else {
      child1.push_back(parent2[i]);
      child2.push_back(parent1[i]);
    }
  }

  vector<vector<double>> children(2);

  children[0] = child1;
  children[1] = child2;

  return children;
}

vector<vector<double>> crossoverPopulation(const vector<vector<double>> &population, const float &crossoverRate) {
  int populationSize = population.size();
  int dimensions = population[0].size();

  vector<vector<double>> newPopulation;

  for (int i = 0; i < populationSize; i += 2) {
    double val = randomDouble(0, 1);

    if (val < crossoverRate) {
      vector<double> parent1 = population[i];
      vector<double> parent2 = population[i + 1];

      vector<vector<double>> children = onePointCrossover(parent1, parent2);

      vector<double> child1 = children[0];
      vector<double> child2 = children[1];

      newPopulation.push_back(child1);
      newPopulation.push_back(child2);
    } else {
      newPopulation.push_back(population[i]);
      newPopulation.push_back(population[i + 1]);
    }
  }

  return newPopulation;
}

void swapMutation(vector<double> &individual, const float &mutationRate) {
  int dimensions = individual.size();

  for (int i = 0; i < dimensions; i++) {
    double val = randomDouble(0, 1);

    if (val < mutationRate) {
      int indexToSwap = randomInt(0, dimensions - 1);

      while (indexToSwap == i) {
        indexToSwap = randomInt(0, dimensions - 1);
      }

      double temp = individual[i];
      individual[i] = individual[indexToSwap];
      individual[indexToSwap] = temp;
    }
  }
}

vector<vector<double>> mutatePopulation(const vector<vector<double>> &population, const float &mutationRate) {
  int populationSize = population.size();
  vector<vector<double>> newPopulation(populationSize);

  for (int i = 0; i < populationSize; i++) {
    newPopulation[i] = population[i];
    swapMutation(newPopulation[i], mutationRate);
  }

  return newPopulation;
}

vector<Generation> runGeneticAlgorithm(
  int populationSize,
  int dimensions,
  double upperBound,
  double lowerBound,
  float mutationRate,
  float crossoverRate,
  int maxIterations
) {
  srand(time(0));

  vector<vector<double>> population = generatePopulation(populationSize, dimensions, upperBound, lowerBound);
  vector<Generation> generations(maxIterations);

  for (int i = 0; i < maxIterations; i++) {
    vector<double> fitness = calculateFitness(population);

    population = rouletteWheelSelection(population, fitness);
    population = crossoverPopulation(population, crossoverRate);
    population = mutatePopulation(population, mutationRate);

    double bestFitness = fitness[0];

    for (int j = 0; j < populationSize; j++) {
      if (fitness[j] < bestFitness) {
        bestFitness = fitness[j];
      }
    }

    Generation generation;
    generation.bestFitness = bestFitness;
    generation.index = i;

    generations[i] = generation;
  }

  return generations;
}

void run_in_worker() {
  printf("Hello from Wasm Worker!\n");
}

void worker_manager() {
  emscripten_wasm_worker_t worker = emscripten_malloc_wasm_worker(/*stackSize: */1024);
  emscripten_wasm_worker_post_function_v(worker, run_in_worker);
}

EMSCRIPTEN_BINDINGS(my_module) {
  register_vector<int>("VectorInt");
  register_vector<double>("VectorDouble");
  register_vector<vector<double>>("VectorVectorDouble");
  register_vector<Generation>("VectorGeneration");

  value_object<Generation>("Generation")
    .field("bestFitness", &Generation::bestFitness)
    .field("index", &Generation::index);

  emscripten::function("runGeneticAlgorithm", &runGeneticAlgorithm);
  emscripten::function("worker_manager", &worker_manager);
}

