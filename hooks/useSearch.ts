import { useQuery, UseQueryResult } from 'react-query'

import { Response, Variables } from '@interfaces/github'
import { fetchUsers } from '@lib/fetchUsers'

type UseSearch = (variables: Variables) => UseQueryResult<Response, unknown>

export const useSearch: UseSearch = variables => {
  return useQuery(['users', variables], fetchUsers)
}
