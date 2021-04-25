import { QueryFunction } from 'react-query'

import { ParsedResponse, Response, Variables } from '@interfaces/github'
import { parseUser } from '@utils/helpers'

type FetchUsers = QueryFunction<
  ParsedResponse | undefined,
  ['users', Variables | undefined]
>

export const fetchUsers: FetchUsers = async ({
  queryKey: [_key, variables],
}) => {
  try {
    if (typeof variables === 'undefined') {
      return
    }
    const res = await fetch('/api/search', {
      body: JSON.stringify(variables),
      method: 'POST',
    })

    const data = (await res.json()) as Response

    return {
      count: data.result.userCount,
      pageInfo: data.result.pageInfo,
      users: data.result.nodes.map(node => parseUser(node)),
    }
  } catch (error) {
    throw new Error(`[fetchUsers]: ${error}`)
  }
}
