import * as React from 'react'

import { Link } from '@components/Link'

const Custom404: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 text-secondary">
      <h1 className="text-2xl">404 - Page Not Found</h1>
      <Link href="/">Home</Link>
    </div>
  )
}

export default Custom404
export { Custom404 }
