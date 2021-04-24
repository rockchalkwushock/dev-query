import * as React from 'react'

import { LayoutContext } from '@contexts/LayoutContext'

export const useLayout = () => {
  const context = React.useContext(LayoutContext)

  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider')
  }
  return context
}
