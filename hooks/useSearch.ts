import { useQuery, UseQueryResult } from 'react-query'

import { ParsedResponse, Variables } from '@interfaces/github'
import { fetchUsers } from '@lib/fetchUsers'
import { parseUser } from '@utils/helpers'

type UseSearch = (
  variables: Variables
) => Pick<
  UseQueryResult<ParsedResponse, unknown>,
  'data' | 'error' | 'isPreviousData' | 'status'
>

// FIXME: Fix this typing.
// @ts-ignore
export const useSearch: UseSearch = variables => {
  const { data, error, isPreviousData, status } = useQuery(
    ['users', variables],
    fetchUsers
  )

  return {
    data: {
      count: data?.result.userCount,
      pageInfo: data?.result.pageInfo,
      users: parseUser(data?.result.nodes!),
    },
    error,
    isPreviousData,
    status,
  }
}
