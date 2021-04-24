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
      <div
        class="flex flex-col items-center space-y-4 w-full"
      >
        <h1>
          Hello NextJS + TailwindCSS + TypeScript Starter
        </h1>
        <div
          class="flex flex-col w-1/2"
        >
          <label
            class="text-lg"
            for="search"
          >
            Search for developers on GitHub:
          </label>
          <input
            class="h-10 p-4 rounded-lg text-lg w-full"
            name="search"
            type="text"
            value=""
          />
        </div>
        <div
          class="flex items-center space-x-4"
        />
        <div
          class="flex flex-col"
        >
          <p
            class="font-semibold text-2xl text-green-500"
          >
            Loading...
          </p>
        </div>
      </div>
    `)
  })
})
