import * as React from 'react'
import NextHead from 'next/head'
import { useRouter } from 'next/router'
import { motion, Variants } from 'framer-motion'

const variants: Variants = {
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.4,
    },
  },
  initial: {
    opacity: 0,
  },
}

const content: Variants = {
  animate: {
    transition: { delayChildren: 0, staggerChildren: 0.1 },
  },
  initial: {},
}

export interface PageMetaData {
  createdAt?: string
  description: string
  image?: string
  title: string
}
interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  pageMetaData: PageMetaData
}

export const AnimatedPage: React.FC<Props> = ({
  children,
  className,
  pageMetaData,
}) => {
  const { asPath } = useRouter()
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://dev-query.com'
      : 'http://localhost:4000'
  const twitterHandle = '@RockChalkDev'
  return (
    <>
      <NextHead>
        <title>{pageMetaData.title}</title>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content="Cody Brunner" name="author" />
        <meta content={pageMetaData.description} name="description" />
        <link rel="canonical" href={`${baseUrl}${asPath}`} />
        {/* Open Graph: http://ogp.me/ */}
        <meta content={pageMetaData.description} property="og:description" />
        {pageMetaData.image && (
          <meta content={pageMetaData.image} property="og:image" />
        )}
        <meta content="en-US" name="og:locale" />
        <meta content="Dev-Query" property="og:site_name" />
        <meta content={pageMetaData.title} property="og:title" />
        <meta content="website" property="og:type" />
        <meta content={`${baseUrl}${asPath}`} property="og:url" />
        {/* Twitter */}
        <meta content="summary_large_image" property="twitter:card" />
        <meta content={twitterHandle} name="twitter:creator" />
        <meta content={twitterHandle} property="twitter:site" />
        {/* Robots */}
        <meta content="index,follow" name="robots" />
        <meta content="index,follow" name="googlebot" />
      </NextHead>
      <motion.section
        animate="animate"
        className={`px-4 md:col-start-3 md:col-end-6 md:px-0 md:pr-4 ${className}`}
        exit="exit"
        initial="initial"
        variants={variants}
      >
        <motion.div
          animate="animate"
          className="flex flex-col flex-grow items-center w-full"
          initial="initial"
          variants={content}
        >
          {children}
        </motion.div>
      </motion.section>
    </>
  )
}
