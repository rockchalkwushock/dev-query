import * as React from 'react'

import { Form, FormValues } from '@components/Form'
import { Pagination } from '@components/Pagination'
import { Variables } from '@interfaces/github'
import { useLayout } from '@hooks/useLayout'
// import { GridLayout } from '@layouts/GridLayout'
import { ListLayout } from '@layouts/ListLayout'

import { useSearch } from '@hooks/useSearch'
import { Icon } from '@components/Icon'

type OnChangeFn = (values: Pick<FormValues, 'limit' | 'query'>) => void

type PaginationCallback = (
  variables: Pick<Variables, 'after' | 'before'>
) => void

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

  const onNextPage = React.useCallback<PaginationCallback>(cursor => {
    setVariables(v => ({
      ...cursor,
      first: v!.first,
      last: null,
      query: v!.query,
    }))
  }, [])

  const onPreviousPage = React.useCallback<PaginationCallback>(cursor => {
    setVariables(v => ({
      ...cursor,
      first: null,
      last: v!.last,
      query: v!.query,
    }))
  }, [])

  return (
    <section className="flex flex-col flex-1 items-center relative space-y-4 w-full">
      <Form onChange={onChange} />
      <div className="flex flex-col flex-1 items-center justify-center">
        {status === 'error' && <h1>Error</h1>}
        {status === 'idle' && <h1>WELCOME MESSAGE</h1>}
        {status === 'loading' && (
          <Icon.Loader className="animate-spin h-20 text-indigo-800 w-20" />
        )}
      </div>
      {status === 'success' && data && (
        <>
          {isFetching ? (
            <Icon.Loader className="animate-spin h-20 text-indigo-800 w-20" />
          ) : (
            <>
              <Pagination
                info={data.pageInfo}
                isPreviousData={isPreviousData}
                onNext={onNextPage}
                onPrev={onPreviousPage}
              />
              <span>Users Found: {data.count}</span>
              {/* {layout === 'grid' && <GridLayout users={data.users} />} */}
              {layout === 'list' && <ListLayout users={data.users} />}
            </>
          )}
        </>
      )}
    </section>
  )
}

export default Home
export { Home }
