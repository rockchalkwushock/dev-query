import * as React from 'react'

import { AnimatedPage } from '@components/AnimatedPage'
import { Form, FormValues } from '@components/Form'
import { Pagination } from '@components/Pagination'
import { Variables } from '@interfaces/github'
import { useLayout } from '@hooks/useLayout'
import { GridLayout } from '@layouts/GridLayout'
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
    // Don't forget to pass null on "last" if the user is searching a new
    // result after paginating through users. If not query will likely explode
    // with "first" & "last" values.
    setVariables(v => ({ ...v, query, first: limit, last: null }))
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
    <AnimatedPage
      className="flex flex-col flex-1 items-center relative space-y-4 w-full"
      pageMetaData={{
        description:
          'Dev-query is an application for searching for developers using the GitHub API',
        title: 'Dev-Query',
      }}
    >
      <Form onChange={onChange} />
      <div
        className={`${
          status === 'success'
            ? 'hidden'
            : 'flex flex-col flex-1 items-center justify-center'
        }`}
      >
        {status === 'error' && <h1>Error</h1>}
        {status === 'idle' && (
          <div className="flex flex-col items-center space-y-4">
            <h1 className="font-medium text-lg uppercase">
              🔎 Welcome to Dev-Query 🔍
            </h1>
            <p className="font-light text-center">
              Dev-Query is an application for searching developers on GitHub via
              the GitHub API.
            </p>
          </div>
        )}
        {status === 'loading' && <Icon.Loader className="loader" />}
      </div>
      {status === 'success' && data && (
        <>
          <div className="flex flex-col items-center justify-center py-4 space-y-4">
            <Pagination
              info={data.pageInfo}
              isPreviousData={isPreviousData}
              limit={cachedLimit}
              onPaginate={onPagination}
            />
            <span className="font-medium text-lg">
              {data.count === 0
                ? 'No results found'
                : `Users Found: ${data.count}`}
            </span>
            {isFetching && (
              <span className="font-medium text-lg">Fetching results...</span>
            )}
          </div>

          {layout === 'grid' && <GridLayout users={data.users} />}
          {layout === 'list' && <ListLayout users={data.users} />}
        </>
      )}
    </AnimatedPage>
  )
}

export default Home
export { Home }
