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
  const { data, error, isFetching, isPreviousData, status } = useQuery(
    ['users', variables],
    fetchUsers,
    { enabled: !!variables, keepPreviousData: true, staleTime: 5000 }
  )

  return {
    data,
    error,
    isFetching,
    isPreviousData,
    status,
  }
}
