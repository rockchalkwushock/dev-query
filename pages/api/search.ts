import type { NextApiRequest, NextApiResponse } from 'next'
import { GraphQLClient } from 'graphql-request'
import { Response, Variables } from '@interfaces/github'
import document from '../../graphql/UserSearch.graphql'

/**
 * Why do we even have this endpoint, couldn't we just query the GitHub API
 * from the client?
 *
 * Short answer:
 * Yes we could just do this on the client.
 *
 * Long answer:
 * nextJS only exposes environment variables prefixed with NEXT_PUBLIC_ to the browser.
 * We don't really want to expose our GITHUB_ACCESS_TOKEN in the browser, that's bad juju.
 * We only want it available on the server so we instantiate the GQL Client in the handler
 * adding the proper authorization headers in the process. If we did this on the client our
 * header would evaluate to:
 *
 * Bearer undefined
 *
 * In doing this the access token is injected into the headers and we can make authenticated
 * requests to the GitHub API through this endpoint.
 */

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Response | string>
) => {
  // Instantiate the GQL Client.
  const client = new GraphQLClient('https://api.github.com/graphql', {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
  })

  // Poor Man's Hack #haks
  // This is an easy way to sanitize the req.body or any extraneous or
  // potentially malicious params. We just parse the body and assert it
  // as our Variables and pull out exactly what we need. If someone
  // injected {"foo": "bar"} it would be left behind here.
  const { after, before, first, last, query } = JSON.parse(
    req.body
  ) as Variables
  try {
    // Make the request to GitHub sending the GQL Document & associated
    // variables for the query.
    const response = await client.request<Response, Variables>(document, {
      after,
      before,
      first,
      last,
      query,
    })

    // Should something fail with the request to GitHub let the client know.
    if (!response) {
      return res.status(500).json('GitHub API Query Failed.')
    }

    // Return the results of our query.
    return res.status(200).json(response)
  } catch (error) {
    throw new Error(`[Handler: '/api/search']: ${error}`)
  }
}

export default handler
