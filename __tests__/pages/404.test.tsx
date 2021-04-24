import * as React from 'react'
import { render } from '@test-utils'

import { Custom404 } from '@pages/404'

describe('[Pages]: 404', () => {
  test('should render page', async () => {
    const { container, getByRole } = render(<Custom404 />)
    expect(getByRole('heading')).toHaveTextContent('404 - Page Not Found')
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="flex flex-col items-center justify-center space-y-2 text-secondary"
      >
        <h1
          class="text-2xl"
        >
          404 - Page Not Found
        </h1>
        <a
          href="/"
        >
          Home
        </a>
      </div>
    `)
  })
})
