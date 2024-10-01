import { customNodeTypes } from '@/components/flow/nodes'
import {
  type Edge,
  MarkerType,
  type Node,
  Position,
  ReactFlow,
} from '@xyflow/react'

const edges: Edge[] = [
  {
    id: '1-2',
    source: '1',
    target: '2',
    sourceHandle: 'bottom',
  },
  {
    id: '2-3',
    source: '2',
    target: '3',
    sourceHandle: 'bottom',
  },
  {
    id: '3-4',
    source: '3',
    target: '4',
    sourceHandle: 'right',
    targetHandle: 'left-target',
  },
  {
    id: '3-6',
    source: '3',
    target: '6',
    sourceHandle: 'bottom',
  },
  {
    id: '6-7',
    source: '6',
    target: '7',
    sourceHandle: 'bottom',
  },
  {
    id: '7-8',
    source: '7',
    target: '8',
    sourceHandle: 'bottom',
  },
  {
    id: '8-2',
    source: '8',
    target: '2',
    targetHandle: 'left-target',
  },
]

const nodes: Node[] = [
  {
    id: '1',
    data: { label: 'Initial Population' },
    position: { x: 100, y: 80 },
  },
  {
    id: '2',
    data: { label: 'Fitness Evaluation' },
    position: { x: 100, y: 140 },
  },
  {
    id: '3',
    type: 'controlNode',
    data: { label: 'Termin action' },
    position: { x: 100, y: 200 },
  },
  {
    id: '4',
    data: { label: 'Best solution' },
    position: { x: 300, y: 200 },
  },
  {
    id: '5',
    type: 'group',
    data: { label: 'Genetic Operators' },
    position: { x: 75, y: 260 },
    style: { backgroundColor: 'rgba(255, 0, 0, 0.2)', width: 200, height: 210 },
  },
  {
    id: '6',
    parentId: '5',
    data: { label: 'Selection' },
    position: { x: 25, y: 25 },
    extent: 'parent',
  },
  {
    id: '7',
    parentId: '5',
    data: { label: 'Crossover' },
    position: { x: 25, y: 85 },
    extent: 'parent',
  },
  {
    id: '8',
    parentId: '5',
    data: { label: 'Mutation' },
    position: { x: 25, y: 145 },
    extent: 'parent',
  },
]

export default function GeneticAlgorithmFlow() {
  return (
    <div style={{ height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        nodeTypes={customNodeTypes}
        edges={edges}
        defaultEdgeOptions={{
          type: 'smoothstep',
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        }}
        fitView
      />
    </div>
  )
}
