import '@/styles/globals.css'
import '@xyflow/react/dist/style.css'
import i18n from '@/lib/i18n'

import type { AppProps } from 'next/app'

import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { I18nextProvider } from 'react-i18next'

const i18n_ = i18n('en')

export default function App({ Component, pageProps }: AppProps) {
  return (
    <I18nextProvider i18n={i18n_}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          <Component {...pageProps} />
        </TooltipProvider>

        <Toaster />
      </ThemeProvider>
    </I18nextProvider>
  )
}
