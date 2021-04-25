import * as React from 'react'
import { useForm } from 'react-hook-form'

import { useLayout } from '@hooks/useLayout'
import { Variables } from '@interfaces/github'
import { GridLayout } from '@layouts/GridLayout'
import { ListLayout } from '@layouts/ListLayout'

import { useSearch } from '@hooks/useSearch'
// import { PageInfo } from '@interfaces/github'
// import { Maybe } from '@interfaces/helpers'

type FormValues = {
  query: string
}

const Home: React.FC = () => {
  // Used to toggle between Grid & List Layout.
  const { layout } = useLayout()
  // Used for getting form values & cursor values to pass to useSearch.
  const [values, setValues] = React.useState<Variables>({ query: '' })
  // Create form.
  const { register, reset, handleSubmit } = useForm<FormValues>()
  // Register onSubmit.
  const onSubmit = handleSubmit(values => setValues(values))

  // const [pageInfo, setPageInfo] = React.useState<Maybe<PageInfo>>(null)

  // const [cursor, setCursor] = React.useState<
  //   Record<string, string | undefined>
  // >({ after: undefined, before: undefined })

  const { data, status } = useSearch({
    ...values,
  })

  // React.useEffect(() => {
  //   if (res.data && res.data) {
  //     setPageInfo(res.data.result.pageInfo)
  //   }
  // }, [res])

  // const onChange = React.useCallback(value => {
  //   setSearchValue(value)
  // }, [])

  // const onPaginate = React.useCallback(() => {
  //   setCursor(state => ({
  //     ...state,
  //     after: pageInfo?.hasNextPage ? pageInfo.startCursor : undefined,
  //     before: pageInfo?.hasPreviousPage ? pageInfo.endCursor : undefined,
  //   }))
  // }, [pageInfo])

  return (
    <div className="flex flex-col items-center relative space-y-4 w-full">
      <form
        className="flex flex-col items-center justify-center space-y-4 w-full"
        onSubmit={onSubmit}
      >
        <input
          className="border border-indigo-800 h-10 px-6 py-2 rounded-3xl text-lg w-80"
          placeholder="Search developers on GitHub"
          type="text"
          {...register('query', { required: true })}
        />
        <div className="flex justify-between w-80">
          <button
            className="bg-white border border-indigo-800 px-10 py-2 rounded-3xl shadow-md text-lg"
            type="submit"
          >
            Search
          </button>
          <button
            className="bg-white border border-indigo-800 px-10 py-2 rounded-3xl shadow-md text-lg"
            onClick={() => reset()}
            type="reset"
          >
            Reset
          </button>
        </div>
      </form>
      {status === 'error' && <h1>Error</h1>}
      {status === 'loading' && <h1>Loading...</h1>}
      {status === 'success' && data && (
        <>
          {layout === 'grid' && <GridLayout users={data.users} />}
          {layout === 'list' && <ListLayout users={data.users} />}
        </>
      )}
      {/* <div className="flex flex-col w-1/2">
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
      </div> */}
      {/* <div className="flex items-center space-x-4">
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
      </div> */}
      {/* <div className="flex flex-col">
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
      </div> */}
    </div>
  )
}

export default Home
export { Home }
