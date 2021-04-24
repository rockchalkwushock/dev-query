import * as React from 'react'
import { render } from '@test-utils'

import { Home } from '@pages/index'

describe('[Pages]: Home', () => {
  test('should render page', async () => {
    const { container, getByRole } = render(<Home />)
    expect(getByRole('heading')).toHaveTextContent(
      'Hello NextJS + TailwindCSS + TypeScript Starter'
    )
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <h1
          class="text-2xl"
        >
          Hello NextJS + TailwindCSS + TypeScript Starter
        </h1>
      </div>
    `)
  })
})
