import * as React from 'react'
import { render } from '@test-utils'

import { Home } from '@pages/index'

describe('[Pages]: Home', () => {
  test('should render page', async () => {
    const { container, getByRole } = render(<Home />)
    expect(getByRole('heading')).toHaveTextContent('WELCOME MESSAGE')
    expect(container.firstChild).toMatchInlineSnapshot(`
      <section
        class="flex flex-col flex-1 items-center relative space-y-4 w-full"
      >
        <form
          class="flex flex-col flex-initial items-center justify-center space-y-4 w-full md:flex-row md:space-x-6 md:space-y-0 lg:space-x-10"
        >
          <div
            class="flex"
          >
            <input
              class="h-12 px-6 py-2 rounded-bl-3xl rounded-tl-3xl text-lg w-72 border border-indigo-800 placeholder-current"
              name="query"
              placeholder="Search developers on GitHub"
              type="text"
            />
            <select
              class="appearance-none border border-l-0 border-indigo-800 h-12 px-6 py-2 rounded-br-3xl rounded-tr-3xl text-lg"
              name="limit"
            >
              <option
                value="12"
              >
                12
              </option>
              <option
                value="24"
              >
                24
              </option>
              <option
                value="48"
              >
                48
              </option>
            </select>
          </div>
          <div
            class="flex"
          >
            <button
              class="bg-white border border-indigo-800 font-semibold px-10 py-2 rounded-bl-3xl rounded-tl-3xl shadow-md text-lg uppercase focus:outline-none "
              type="submit"
            >
              Query
            </button>
            <button
              class="bg-white border border-l-0 border-indigo-800 font-semibold px-10 py-2 rounded-br-3xl rounded-tr-3xl shadow-md text-lg uppercase focus:outline-none"
              type="reset"
            >
              Reset
            </button>
          </div>
        </form>
        <div
          class="flex flex-col flex-1 items-center justify-center"
        >
          <h1>
            WELCOME MESSAGE
          </h1>
        </div>
      </section>
    `)
  })
})
