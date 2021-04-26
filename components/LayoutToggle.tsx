import * as React from 'react'
import { motion, Variants } from 'framer-motion'

import { useLayout } from '@hooks/useLayout'
import { Icon } from './Icon'

const variants: Variants = {
  closed: {
    opacity: 0,
    transition: {},
  },
  open: {
    opacity: 1,
    transition: {
      delay: 0.3,
    },
  },
}

export const LayoutToggle: React.FC = () => {
  const { layout, toggleLayout } = useLayout()

  const onToggleLayout = React.useCallback(() => {
    toggleLayout({ type: layout === 'grid' ? 'toggle-list' : 'toggle-grid' })
  }, [layout, toggleLayout])
  return (
    <motion.button
      aria-label="Toggle Layout"
      className="right-4 toggle-button"
      onClick={onToggleLayout}
      type="button"
      variants={variants}
    >
      {layout === 'grid' && <Icon.Grid className="text-emerald-300" />}
      {layout === 'list' && <Icon.List className="text-emerald-300" />}
    </motion.button>
  )
}
