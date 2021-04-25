import * as React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { render, RenderOptions } from '@testing-library/react'

import { LayoutProvider } from '@contexts/LayoutContext'

const client = new QueryClient()

const TestingWrapper: React.FC = ({ children }) => {
  // Add providers here.
  // i.e. <ThemeProvider />
  return (
    <QueryClientProvider client={client}>
      <LayoutProvider>{children}</LayoutProvider>
    </QueryClientProvider>
  )
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) => render(ui, { wrapper: TestingWrapper, ...options })

export * from '@testing-library/react'

export { customRender as render }
