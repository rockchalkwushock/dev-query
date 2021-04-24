import * as React from 'react'
import { render } from '@test-utils'

import { Link } from '@components/Link'

describe('[Components]: Link', () => {
  test('should render', () => {
    const { container, getByText } = render(<Link href="/">Home</Link>)

    expect(getByText('Home')).toBeInTheDocument()
    expect(container.firstChild).toMatchInlineSnapshot(`
      <a
        href="/"
      >
        Home
      </a>
    `)
  })
})
