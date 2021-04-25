import * as React from 'react'

import { Icon } from '@components/Icon'
import { PageInfo, Variables } from '@interfaces/github'

interface Props {
  info: PageInfo
  isPreviousData: boolean
  onNext: (variables: Pick<Variables, 'after' | 'before'>) => void
  onPrev: (variables: Pick<Variables, 'after' | 'before'>) => void
}

export const Pagination: React.FC<Props> = ({
  info,
  isPreviousData,
  onNext,
  onPrev,
}) => {
  return (
    <div className="flex">
      <button
        className={`bg-white border border-indigo-800 font-semibold px-10 py-2 shadow-md text-lg uppercase focus:outline-none ${
          !info.hasPreviousPage
            ? 'hidden'
            : info.hasNextPage && info.hasPreviousPage
            ? 'rounded-bl-3xl rounded-tl-3xl'
            : 'rounded-3xl'
        }`}
        disabled={!info.hasPreviousPage}
        onClick={() =>
          onPrev({
            before: info.startCursor,
          })
        }
        type="button"
      >
        <Icon.Rewind />
      </button>{' '}
      <button
        className={`bg-white border border-indigo-800 font-semibold px-10 py-2 shadow-md text-lg uppercase focus:outline-none ${
          !info.hasNextPage
            ? 'hidden'
            : info.hasNextPage && info.hasPreviousPage
            ? 'border-l-0 rounded-br-3xl rounded-tr-3xl'
            : 'rounded-3xl'
        }`}
        disabled={isPreviousData || !info.hasNextPage}
        onClick={() =>
          onNext({
            after: info.endCursor,
          })
        }
        type="button"
      >
        <Icon.FastForward />
      </button>
    </div>
  )
}
