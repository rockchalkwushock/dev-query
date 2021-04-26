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
  variables: Pick<Variables, 'after' | 'before' | 'first' | 'last'>
) => void

const Home: React.FC = () => {
  // Used to toggle between Grid & List Layout.
  const { layout } = useLayout()
  // Used for getting form values & cursor values to pass to useSearch.
  const [variables, setVariables] = React.useState<Variables | undefined>(
    undefined
  )
  // Set this initially to the default for "limit" on the form.
  const [cachedLimit, setCachedLimit] = React.useState<number>(() => 12)

  const { data, isFetching, isPreviousData, status } = useSearch(variables)

  const onChange = React.useCallback<OnChangeFn>(({ limit, query }) => {
    setVariables(v => ({ ...v, query, first: limit }))
    // Keep the limit up-to-date.
    setCachedLimit(limit)
  }, [])

  const onPagination = React.useCallback<PaginationCallback>(pValues => {
    setVariables(v => ({
      ...pValues,
      query: v!.query,
    }))
  }, [])

  return (
    <section className="flex flex-col flex-1 items-center relative space-y-4 w-full">
      <Form onChange={onChange} />
      <div
        className={`${
          status === 'success'
            ? 'hidden'
            : 'flex flex-col flex-1 items-center justify-center'
        }`}
      >
        {status === 'error' && <h1>Error</h1>}
        {status === 'idle' && <h1>WELCOME MESSAGE</h1>}
        {status === 'loading' && <Icon.Loader className="loader" />}
      </div>
      {status === 'success' && data && (
        <>
          <Pagination
            info={data.pageInfo}
            isPreviousData={isPreviousData}
            limit={cachedLimit}
            onPaginate={onPagination}
          />
          <span>Users Found: {data.count}</span>
          {isFetching && <p>Fetching results...</p>}
          {/* {layout === 'grid' && <GridLayout users={data.users} />} */}
          {layout === 'list' && <ListLayout users={data.users} />}
        </>
      )}
    </section>
  )
}

export default Home
export { Home }
