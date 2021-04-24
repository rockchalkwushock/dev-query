import * as React from 'react'
import { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import '../styles/global.scss'
import { Footer } from '@components/Footer'
import { Header } from '@components/Header'
import { LayoutToggle } from '@components/LayoutToggle'
import { LayoutProvider } from '@contexts/LayoutContext'

interface Props extends AppProps {}

const App: React.FC<Props> = ({ Component, pageProps }) => {
  const queryClientRef = React.useRef<QueryClient>()
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <LayoutProvider>
        <LayoutToggle />
        <div className="container flex flex-col flex-grow items-center justify-center mx-auto relative w-full">
          <Header />
          <main className="flex flex-col flex-grow flex-shrink-0">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </LayoutProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
export { App }
