import * as React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from 'next-themes'
import { render, RenderOptions } from '@testing-library/react'

import { LayoutProvider } from '@contexts/LayoutContext'

const client = new QueryClient()

const TestingWrapper: React.FC = ({ children }) => {
  // Add providers here.
  // i.e. <ThemeProvider />
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider
        // This needs to match what is being used in tailwind.config.js
        attribute="class"
        // The key that will put in localStorage.
        storageKey="dev-query.com-theme"
      >
        <LayoutProvider>{children}</LayoutProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) => render(ui, { wrapper: TestingWrapper, ...options })

export * from '@testing-library/react'

export { customRender as render }
