import * as React from 'react'
import { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from 'next-themes'
import { ReactQueryDevtools } from 'react-query/devtools'

import '../styles/global.scss'
import { Footer } from '@components/Footer'
import { Header } from '@components/Header'
import { LayoutToggle } from '@components/LayoutToggle'
import { ThemeToggle } from '@components/ThemeToggle'
import { LayoutProvider } from '@contexts/LayoutContext'

interface Props extends AppProps {}

const App: React.FC<Props> = ({ Component, pageProps }) => {
  const queryClientRef = React.useRef<QueryClient>()
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <ThemeProvider
        // This needs to match what is being used in tailwind.config.js
        attribute="class"
        // The key that will put in localStorage.
        storageKey="dev-query.com-theme"
      >
        <LayoutProvider>
          <LayoutToggle />
          <ThemeToggle />
          <div className="container flex flex-col flex-grow items-center justify-center mx-auto relative w-full">
            <Header />
            <main className="flex flex-col flex-1 w-full">
              <Component {...pageProps} />
            </main>
            <Footer />
          </div>
        </LayoutProvider>
      </ThemeProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
export { App }
