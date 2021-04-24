// Need to do this for TS so it can recognize files ending in .graphql
declare module '*.graphql' {
  import { DocumentNode } from 'graphql'
  const Schema: DocumentNode

  export = Schema
}
