import * as React from 'react'

interface Props {}

export const Header: React.FC<Props> = () => {
  return (
    <header className="flex flex-grow-0 h-32 items-center p-6 w-full">
      {/* <div className="text-2xl">
        <p>Dev-Query</p>
      </div> */}
    </header>
  )
}
