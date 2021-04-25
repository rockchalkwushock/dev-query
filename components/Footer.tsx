import * as React from 'react'

interface Props {}

export const Footer: React.FC<Props> = () => {
  return (
    <footer className="flex flex-grow-0 items-center p-6 w-full">
      <div className="text-lg">
        <a
          href="https://codybrunner.dev"
          rel="noopener noreferrer"
          target="_blank"
        >
          © 2021 Cody Brunner
        </a>
      </div>
    </footer>
  )
}
