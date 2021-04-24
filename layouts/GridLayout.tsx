import * as React from 'react'

interface Props {
  items: Array<unknown>
}

const color = [
  'amber',
  'blue',
  'cyan',
  'gray',
  'green',
  'indigo',
  'orange',
  'pink',
  'purple',
  'red',
  'yellow',
]

export const GridLayout: React.FC<Props> = ({ items }) => {
  return (
    <ul className="bg-red-100 gap-4 grid grid-cols-1 min-h-screen p-6 w-screen sm:grid-cols-2 md:grid-cols-3">
      {items.map((_v, i) => (
        <li className={`bg-${color[i]}-500 p-4`} key={i}>
          hello
        </li>
      ))}
    </ul>
  )
}
