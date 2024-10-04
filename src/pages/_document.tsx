import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
        <Script src="/wasm/ha.js" strategy="beforeInteractive" />
      </body>
    </Html>
  )
}
