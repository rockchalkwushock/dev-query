import { useQuery, UseQueryResult } from 'react-query'

import { ParsedResponse, Variables } from '@interfaces/github'
import { fetchUsers } from '@lib/fetchUsers'

type UseSearch = (
  variables: Variables | undefined
) => Pick<
  UseQueryResult<ParsedResponse, unknown>,
  'data' | 'error' | 'isFetching' | 'isPreviousData' | 'status'
>

export const useSearch: UseSearch = variables => {
  console.log('useSearch', variables)
  const { data, error, isFetching, isPreviousData, status } = useQuery(
    ['users', variables],
    fetchUsers,
    // - enabled prevent this hook from executing immediately since we define
    //   variables as "undefined" onMount.
    // - keepPreviousData will prevent data from being discarded on a new query.
    // - staleTime: will allow data to remain stale for 10000.
    { enabled: !!variables, keepPreviousData: true, staleTime: 10000 }
  )

  return {
    data,
    error,
    isFetching,
    isPreviousData,
    status,
  }
}
