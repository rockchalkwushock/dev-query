import * as React from 'react'

interface Props {}

export const Footer: React.FC<Props> = () => {
  return (
    <footer className="flex flex-col flex-grow-0 items-center justify-center py-6 space-y-2 w-full md:flex-row md:justify-between md:space-y-0">
      <div className="flex flex-col space-y-2">
        <span className="text-lg">Built with 🍺, ☕, & ❤️.</span>
        <a
          className="text-lg"
          href="https://codybrunner.dev"
          rel="noopener noreferrer"
          target="_blank"
        >
          © 2021 Cody Brunner
        </a>
      </div>
      <a
        className="text-lg"
        href="https://github.com/rockchalkwushock/dev-query/issues"
        rel="noopener noreferrer"
        target="_blank"
      >
        Report a Bug 🐛
      </a>
    </footer>
  )
}
