import * as React from 'react'
import {
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemState,
} from 'react-accessible-accordion'

import { Icon } from './Icon'
import { User } from '@interfaces/github'

interface Props {
  user: User
}

export const Card: React.FC<Props> = ({ user }) => {
  return (
    <AccordionItemState>
      {({ expanded }) => (
        <>
          <AccordionItemHeading>
            <AccordionItemButton
              className={`bg-white border border-indigo-800 flex items-center py-4 relative rounded-md space-x-2 ${
                expanded
                  ? 'border-b-0 rounded-bl-none rounded-br-none'
                  : 'shadow-md'
              }`}
            >
              <button
                aria-label="Toggle Card"
                className="absolute bg-indigo-800 border-0 cursor-pointer flex h-10 items-center justify-center outline-none right-2 rounded-full top-2 w-10 z-20"
                type="button"
              >
                {expanded && <Icon.Minimize2 className="text-white" />}
                {!expanded && <Icon.Maximize2 className="text-white" />}
              </button>
              <img
                alt={`${user.name || user.username} Avatar`}
                className="border border-indigo-800 h-16 rounded-full w-16"
                src={user.avatar}
              />
              <div className="flex flex-col space-y-2">
                {user.name && <p className="leading-4 text-xl">{user.name}</p>}
                <p className={`leading-4 ${user.name ? 'text-lg' : 'text-xl'}`}>
                  @{user.username}
                </p>
              </div>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel
            className={`bg-gray-200 gap-4 grid grid-cols-1 p-4 ${
              expanded
                ? 'border-b border-l border-r border-indigo-800 rounded-bl-md rounded-br-md shadow-md'
                : 'hidden'
            }`}
          >
            <li className="flex items-center space-x-2 text-indigo-800">
              <Icon.Users className="h-5 text-indigo-800 w-5" />
              <span>{user.followers} followers</span>
            </li>
            <li className="flex items-center space-x-2 text-indigo-800">
              <Icon.GitMerge className="h-5 text-indigo-800 w-5" />
              <span>{user.contributions} contributions</span>
            </li>
            <li className="flex items-center space-x-2 text-indigo-800">
              <Icon.Star className="h-5 text-indigo-800 w-5" />
              <span>{user.stars} stars</span>
            </li>
            {user.email && (
              <li className="flex items-center space-x-2 text-indigo-800">
                <Icon.Mail className="h-5 text-indigo-800 w-5" />
                <span>{user.email}</span>
              </li>
            )}
            {user.location && (
              <li className="flex items-center space-x-2 text-indigo-800">
                <Icon.MapPin className="h-5 text-indigo-800 w-5" />
                <span>{user.location}</span>
              </li>
            )}
            {user.twitter && (
              <li className="flex items-center space-x-2 text-indigo-800">
                <Icon.Twitter className="h-5 text-indigo-800 w-5" />
                <span>@{user.twitter}</span>
              </li>
            )}
            {user.websiteUrl && (
              <li className="flex items-center space-x-2 text-indigo-800">
                <Icon.Globe className="h-5 text-indigo-800 w-5" />
                <span>{user.websiteUrl}</span>
              </li>
            )}
          </AccordionItemPanel>
        </>
      )}
    </AccordionItemState>
  )
}
