import * as React from 'react'

import { Icon } from '@components/Icon'
import { PageInfo, Variables } from '@interfaces/github'

interface Props {
  info: PageInfo
  isPreviousData: boolean
  limit: number
  onPaginate: (
    variables: Pick<Variables, 'after' | 'before' | 'first' | 'last'>
  ) => void
}

export const Pagination: React.FC<Props> = ({
  info,
  isPreviousData,
  limit,
  onPaginate,
}) => {
  return (
    <div className="flex">
      <button
        className={`bg-secondary border border-primary font-semibold px-10 py-2 shadow-md text-lg uppercase focus:outline-none ${
          !info.hasPreviousPage
            ? 'hidden'
            : info.hasNextPage && info.hasPreviousPage
            ? 'rounded-bl-3xl rounded-tl-3xl'
            : 'rounded-3xl'
        }`}
        disabled={!info.hasPreviousPage}
        onClick={() =>
          onPaginate({
            before: info.startCursor,
            first: null,
            last: limit,
          })
        }
        type="button"
      >
        <Icon.Rewind />
      </button>
      <button
        className={`bg-secondary border border-primary font-semibold px-10 py-2 shadow-md text-lg uppercase focus:outline-none ${
          !info.hasNextPage
            ? 'hidden'
            : info.hasNextPage && info.hasPreviousPage
            ? 'border-l-0 rounded-br-3xl rounded-tr-3xl'
            : 'rounded-3xl'
        }`}
        disabled={isPreviousData || !info.hasNextPage}
        onClick={() =>
          onPaginate({
            after: info.endCursor,
            first: limit,
            last: null,
          })
        }
        type="button"
      >
        <Icon.FastForward />
      </button>
    </div>
  )
}
