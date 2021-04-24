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

export const ListLayout: React.FC<Props> = ({ items }) => {
  return (
    <ul className="bg-blue-100 flex flex-col min-h-screen p-6 space-y-4 w-screen sm:px-20 md:px-36">
      {items.map((_v, i) => (
        <li className={`bg-${color[i]}-500 p-4`} key={i}>
          hello
        </li>
      ))}
    </ul>
  )
}
