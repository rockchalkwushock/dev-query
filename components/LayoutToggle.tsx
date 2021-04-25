import * as React from 'react'

import { useLayout } from '@hooks/useLayout'
import { Icon } from './Icon'

export const LayoutToggle: React.FC = () => {
  const { layout, toggleLayout } = useLayout()

  const onToggleLayout = React.useCallback(() => {
    toggleLayout({ type: layout === 'grid' ? 'toggle-list' : 'toggle-grid' })
  }, [layout, toggleLayout])
  return (
    <button
      aria-label="Toggle Layout"
      className="absolute bg-white border-0 cursor-pointer flex h-12 items-center justify-center outline-none right-4 rounded-full top-4 w-12 z-20"
      onClick={onToggleLayout}
      type="button"
    >
      {layout === 'grid' && <Icon.Grid className="text-indigo-800" />}
      {layout === 'list' && <Icon.List className="text-indigo-800" />}
    </button>
  )
}
