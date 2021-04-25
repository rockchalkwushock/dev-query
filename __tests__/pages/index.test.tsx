import * as React from 'react'
import { render } from '@test-utils'

import { Home } from '@pages/index'

describe('[Pages]: Home', () => {
  test('should render page', async () => {
    const { container, getByRole } = render(<Home />)
    expect(getByRole('heading')).toHaveTextContent('Loading...')
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="flex flex-col items-center relative space-y-4 w-full"
      >
        <h1>
          Loading...
        </h1>
      </div>
    `)
  })
})
