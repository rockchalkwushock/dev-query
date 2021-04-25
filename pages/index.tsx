import * as React from 'react'

import { Form, FormValues } from '@components/Form'
import { Variables } from '@interfaces/github'
import { useLayout } from '@hooks/useLayout'
// import { GridLayout } from '@layouts/GridLayout'
import { ListLayout } from '@layouts/ListLayout'

import { useSearch } from '@hooks/useSearch'

type OnChangeFn = (values: Pick<FormValues, 'limit' | 'query'>) => void

const Home: React.FC = () => {
  // Used to toggle between Grid & List Layout.
  const { layout } = useLayout()
  // Used for getting form values & cursor values to pass to useSearch.
  const [variables, setVariables] = React.useState<Variables | undefined>(
    undefined
  )

  const { data, isFetching, isPreviousData, status } = useSearch(variables)

  const onChange = React.useCallback<OnChangeFn>(({ limit, query }) => {
    setVariables(v => ({ ...v, query, first: limit }))
  }, [])

  return (
    <div className="flex flex-col items-center relative space-y-4 w-full">
      <Form onChange={onChange} />
      {status === 'error' && <h1>Error</h1>}
      {status === 'idle' && <h1>WELCOME MESSAGE</h1>}
      {status === 'loading' && <h1>Loading...</h1>}
      {status === 'success' && data && (
        <>
          <button
            onClick={() =>
              setVariables(v => ({
                before: data?.pageInfo.startCursor,
                first: null,
                last: 10,
                query: v!.query,
              }))
            }
            disabled={!data?.pageInfo.hasPreviousPage}
          >
            Previous Page
          </button>{' '}
          <button
            onClick={() =>
              setVariables(v => ({
                after: data?.pageInfo.endCursor,
                first: 10,
                query: v!.query,
              }))
            }
            disabled={isPreviousData || !data?.pageInfo.hasNextPage}
          >
            Next Page
          </button>
          {
            // Since the last page's data potentially sticks around between page requests,
            // we can use `isFetching` to show a background loading
            // indicator since our `status === 'loading'` state won't be triggered
            isFetching ? <span> Loading...</span> : null
          }
          {/* {layout === 'grid' && <GridLayout users={data.users} />} */}
          {layout === 'list' && <ListLayout users={data.users} />}
        </>
      )}
    </div>
  )
}

export default Home
export { Home }
