import * as React from 'react'

// https://kentcdodds.com/blog/how-to-use-react-context-effectively

type Action = { type: 'toggle-grid' } | { type: 'toggle-list' }
type Dispatch = (action: Action) => void
type Layout = 'grid' | 'list'
type LayoutContextType = { toggleLayout: Dispatch; layout: Layout } | undefined
interface LayoutProviderProps {
  children: React.ReactNode
}

export const LayoutContext = React.createContext<LayoutContextType>(undefined)

const layoutReducer = (_state: Layout, action: Action): Layout => {
  switch (action.type) {
    case 'toggle-grid':
      return 'grid'
    case 'toggle-list':
      return 'list'
    default: {
      // @ts-ignore
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const [state, dispatch] = React.useReducer(layoutReducer, 'list')
  return (
    <LayoutContext.Provider value={{ toggleLayout: dispatch, layout: state }}>
      {children}
    </LayoutContext.Provider>
  )
}
