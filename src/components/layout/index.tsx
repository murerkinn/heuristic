import { SquareTerminal, Triangle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { route } = useRouter()
  const { t } = useTranslation()

  return (
    <div className="grid h-screen w-full pl-[53px]">
      <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Button variant="outline" size="icon" aria-label="Home">
            <Triangle className="size-5 fill-foreground" />
          </Button>
        </div>

        <nav className="grid gap-1 p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn('rounded-lg', {
                    'bg-muted': route === '/',
                  })}
                  aria-label={t('playground')}
                >
                  <SquareTerminal className="size-5" />
                </Button>
              </Link>
            </TooltipTrigger>

            <TooltipContent side="right" sideOffset={5}>
              {t('playground')}
            </TooltipContent>
          </Tooltip>
        </nav>

        {/* <nav className="mt-auto grid gap-1 p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mt-auto rounded-lg"
                aria-label="Help"
              >
                <LifeBuoy className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Help
            </TooltipContent>
          </Tooltip>
        </nav> */}
      </aside>

      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">
            Heuristic Algorithms Playground
          </h1>

          <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1.5 text-sm"
            asChild
          >
            <a
              href="https://github.com/murerkinn/heuristic"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubLogoIcon className="size-3.5" />
              GitHub
            </a>
          </Button>
        </header>

        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  )
}
