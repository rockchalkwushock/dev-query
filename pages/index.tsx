import * as React from 'react'
import { useQuery } from 'react-query'
import { gql, GraphQLClient } from 'graphql-request'
import { Maybe } from '@interfaces/helpers'

const endpoint = 'https://api.github.com/graphql'

const document = gql`
  query GITHUB_USER_SEARCH($after: String, $before: String, $query: String!) {
    result: search(
      after: $after
      before: $before
      first: 10
      query: $query
      type: USER
    ) {
      nodes {
        ... on User {
          avatarUrl(size: 100)
          bio
          company
          createdAt
          email
          followers {
            totalCount
          }
          id
          location
          login
          name
          repositoriesContributedTo {
            totalCount
          }
          starredRepositories {
            totalCount
          }
          status {
            emoji
            message
          }
          twitterUsername
          url
          websiteUrl
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      userCount
    }
  }
`

/**
 * If "hasNextPage" === true grab "startCursor" and pass value to "after" to paginate to the next page.
 * If "hasPreviousPage" === true grab "endCursor" and pass value to "before" to paginate to the previous page.
 */

const gqlClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
  },
})

interface PageInfo {
  endCursor: string
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor: string
}

const Home: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState<string | undefined>(
    undefined
  )

  const [pageInfo, setPageInfo] = React.useState<Maybe<PageInfo>>(null)

  const [cursor, setCursor] = React.useState<
    Record<string, string | undefined>
  >({ after: undefined, before: undefined })

  const res = useQuery(
    [
      'users',
      { after: cursor.after, before: cursor.before, query: searchValue },
    ],
    // async (key, variables) => gqlClient.request(document, variables)
    async ({ queryKey: [_key, variables] }) => {
      // @ts-ignore
      if (!variables.query) {
        return
      }
      const r = await gqlClient.request(document, variables)
      return r
    },
    {
      onSuccess: data => {
        if (!data) {
          return
        }
        setPageInfo(data.result.pageInfo)
      },
    }
  )

  const onChange = React.useCallback(value => {
    setSearchValue(value)
  }, [])

  const onPaginate = React.useCallback(() => {
    setCursor(state => ({
      ...state,
      after: pageInfo?.hasNextPage ? pageInfo.startCursor : undefined,
      before: pageInfo?.hasPreviousPage ? pageInfo.endCursor : undefined,
    }))
  }, [pageInfo])

  return (
    <div className="flex flex-col items-center space-y-4 w-full">
      <div className="flex flex-col w-1/2">
        <label className="text-lg" htmlFor="search">
          Search for developers on GitHub:
        </label>
        <input
          className="h-10 p-4 rounded-lg text-lg w-full"
          name="search"
          onChange={event => onChange(event.currentTarget.value)}
          value={searchValue}
          type="text"
        />
      </div>
      <div className="flex items-center space-x-4">
        {pageInfo?.hasPreviousPage && (
          <button
            className="bg-white border border-indigo-800 font-semibold px-4 py-1 rounded-full text-lg text-indigo-800 uppercase"
            onClick={onPaginate}
          >
            Previous
          </button>
        )}
        {pageInfo?.hasNextPage && (
          <button
            className="bg-white border border-indigo-800 font-semibold px-4 py-1 rounded-full text-lg text-indigo-800 uppercase"
            onClick={onPaginate}
          >
            Next
          </button>
        )}
      </div>
      <div className="flex flex-col">
        {res.status === 'error' && (
          <h1 className="font-semibold text-2xl text-red-500">Error</h1>
        )}
        {res.status === 'loading' && (
          <h1 className="font-semibold text-2xl text-green-500">Loading...</h1>
        )}
        {res.status === 'success' && res.data && (
          <ul className="flex flex-col space-y-4">
            {res.data.result.nodes.map(node => (
              <li
                className="bg-white border border-indigo-800 p-4 rounded-md shadow-md text-indigo-800"
                key={node.id}
              >
                <h1>{node.name}</h1>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Home
export { Home }
