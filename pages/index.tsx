import * as React from 'react'

import { useSearch } from '@hooks/useSearch'
import { PageInfo } from '@interfaces/github'
import { Maybe } from '@interfaces/helpers'

const Home: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState<string | undefined>(
    undefined
  )

  const [pageInfo, setPageInfo] = React.useState<Maybe<PageInfo>>(null)

  const [cursor, setCursor] = React.useState<
    Record<string, string | undefined>
  >({ after: undefined, before: undefined })

  const res = useSearch({
    after: cursor.after,
    before: cursor.before,
    query: searchValue!,
  })

  React.useEffect(() => {
    if (res.data && res.data) {
      setPageInfo(res.data.result.pageInfo)
    }
  }, [res])

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
      <h1>Hello NextJS + TailwindCSS + TypeScript Starter</h1>
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
          <p className="font-semibold text-2xl text-red-500">Error</p>
        )}
        {res.status === 'loading' && (
          <p className="font-semibold text-2xl text-green-500">Loading...</p>
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
