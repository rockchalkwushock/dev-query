import * as React from 'react'
import { motion, Variants } from 'framer-motion'
import { useTheme } from 'next-themes'

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

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  const onToggleTheme = React.useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme])

  return (
    <motion.button
      aria-label="Theme Toggle"
      className="left-4 text-amber-300 toggle-button"
      onClick={onToggleTheme}
      type="button"
      variants={variants}
    >
      {mounted && theme === 'dark' && <Icon.Moon />}
      {mounted && theme === 'light' && <Icon.Sun />}
    </motion.button>
  )
}
