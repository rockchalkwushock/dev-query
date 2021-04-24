import * as React from 'react'
import { render, RenderOptions } from '@testing-library/react'

const TestingWrapper: React.FC = ({ children }) => {
  // Add providers here.
  // i.e. <ThemeProvider />
  return <>{children}</>
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) => render(ui, { wrapper: TestingWrapper, ...options })

export * from '@testing-library/react'

export { customRender as render }
