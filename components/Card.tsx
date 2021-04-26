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
              className={`bg-secondary border border-primary flex items-center p-4 pl-10 relative ridiculous-accordion-transition rounded-md space-x-2 focus:outline-none md:pl-12 ${
                expanded
                  ? 'bg-orange-400 dark:bg-orange-700 border-b-0 rounded-bl-none rounded-br-none'
                  : 'shadow-md'
              }`}
            >
              <a
                className={`absolute border-0 cursor-pointer flex h-10 inset-y-7 items-center justify-center outline-none right-2 rounded-full w-10 z-60 md:right-6 ${
                  expanded
                    ? 'bg-coolGray-800'
                    : 'bg-orange-400 dark:bg-orange-700'
                }`}
                // Poor Man's hack around the event propagating up the chain to the
                // AccordionContext which would cause the Accordion to open & then the
                // Redirect to the user's profile
                onClick={event => event.stopPropagation()}
                href={user.githubUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon.ExternalLink className="text-white" />
              </a>
              <button
                aria-label="Toggle Card"
                className="absolute border-0 cursor-pointer flex h-10 inset-y-7 items-center justify-center left-0 outline-none rounded-full w-10 z-20"
                type="button"
              >
                {expanded && (
                  <Icon.ChevronDown className="h-8 text-secondary w-8" />
                )}
                {!expanded && (
                  <Icon.ChevronRight className="h-8 text-secondary w-8" />
                )}
              </button>
              <img
                alt={`${user.name || user.username} Avatar`}
                className="border border-transparent h-16 rounded-full shadow-md w-16"
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
            className={`bg-secondary gap-4 grid grid-cols-1 p-4 ${
              expanded
                ? 'border-b border-l border-r border-primary delay-100 ridiculous-accordion-panel-gradient rounded-bl-md rounded-br-md ridiculous-accordion-transition shadow-md'
                : 'hidden'
            }`}
          >
            <li className="flex items-center space-x-2 text-secondary">
              <Icon.Calendar className="h-6 text-secondary w-6" />
              <span>Joined {user.createdAt}</span>
            </li>
            <li className="flex items-center space-x-2 text-secondary">
              <Icon.Users className="h-6 text-secondary w-6" />
              <span>{user.followers} followers</span>
            </li>
            <li className="flex items-center space-x-2 text-secondary">
              <Icon.GitMerge className="h-6 text-secondary w-6" />
              <span>{user.contributions} contributions</span>
            </li>
            <li className="flex items-center space-x-2 text-secondary">
              <Icon.Star className="h-6 text-secondary w-6" />
              <span>{user.stars} stars</span>
            </li>
            {user.location && (
              <li className="flex items-center space-x-2 text-secondary">
                <Icon.MapPin className="h-6 text-secondary w-6" />
                <span>{user.location}</span>
              </li>
            )}
            {user.email && (
              <li className="flex items-center space-x-2 text-secondary">
                <Icon.Mail className="h-6 text-secondary w-6" />
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </li>
            )}
            {user.twitter && (
              <li className="flex items-center space-x-2 text-secondary">
                <Icon.Twitter className="h-6 text-secondary w-6" />
                <a
                  href={`https://twitter.com/${user.twitter}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  @{user.twitter}
                </a>
              </li>
            )}
            {user.websiteUrl && (
              <li className="flex items-center space-x-2 text-secondary">
                <Icon.Globe className="h-6 text-secondary w-6" />
                <a
                  href={user.websiteUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {user.websiteUrl}
                </a>
              </li>
            )}
          </AccordionItemPanel>
        </>
      )}
    </AccordionItemState>
  )
}
