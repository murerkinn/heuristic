import '@/styles/globals.css'
import '@xyflow/react/dist/style.css'

import type { AppProps } from 'next/app'

import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import WasmProvider from '@/components/wasm-provider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WasmProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
        <TooltipProvider>
          <Component {...pageProps} />
        </TooltipProvider>

        <Toaster />
      </ThemeProvider>
    </WasmProvider>
  )
}
