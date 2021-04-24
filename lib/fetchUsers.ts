import { QueryFunction } from 'react-query'

import { Response, Variables } from '@interfaces/github'

type FetchUsers = QueryFunction<Response, ['users', Variables]>

export const fetchUsers: FetchUsers = async ({
  queryKey: [_key, variables],
}) => {
  try {
    // If "query" is undefined abort running the query.
    // We do this because "query" is a required string by GitHub's API.
    // Problem is passing an empty string will result in a query and that
    // query returns all users on the platform.
    // Poor Man's Hack #haks
    if (!variables.query) {
      return
    }
    const res = await fetch('/api/search', {
      body: JSON.stringify(variables),
      method: 'POST',
    })

    return res.json()
  } catch (error) {
    throw new Error(`[fetchUsers]: ${error}`)
  }
}
