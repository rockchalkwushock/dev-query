import * as React from 'react'
import NextLink, { LinkProps } from 'next/link'

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

const CustomLink = React.forwardRef<HTMLAnchorElement, Props>(
  ({ children, href, onClick }, ref) => {
    return (
      <a href={href} onClick={onClick} ref={ref}>
        {children}
      </a>
    )
  }
)

export const Link: React.FC<LinkProps> = ({ children, ...rest }) => {
  return (
    <NextLink {...rest} passHref>
      <CustomLink>{children}</CustomLink>
    </NextLink>
  )
}
