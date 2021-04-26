import * as React from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import { Accordion, AccordionItem } from 'react-accessible-accordion'

import { Card } from '@components/Card'
import { Icon } from '@components/Icon'
import { User } from '@interfaces/github'
interface Props {
  users: Array<User>
}

export const GridLayout: React.FC<Props> = ({ users }) => {
  React.useEffect(() => {}, [])
  return (
    <>
      <BrowserView renderWithFragment>
        <ul className="gap-4 grid grid-cols-3 min-h-screen p-6 w-screen">
          {users.map(user => (
            <li
              className="bg-secondary border border-primary flex flex-col p-4 relative rounded-md shadow-md"
              key={`${user.id}--grid--browser`}
            >
              <a
                className="absolute bg-coolGray-800 border-0 cursor-pointer flex h-10 inset-y-4 items-center justify-center outline-none right-4 rounded-full w-10 z-60"
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
              <div className="flex items-center pb-8 space-x-4">
                <img
                  alt={`${user.name || user.username} Avatar`}
                  className="border border-transparent h-20 rounded-full shadow-md w-20"
                  src={user.avatar}
                />
                <div className="flex flex-col space-y-2">
                  {user.name && (
                    <p className="leading-4 text-xl">{user.name}</p>
                  )}
                  <p
                    className={`leading-4 ${user.name ? 'text-lg' : 'text-xl'}`}
                  >
                    @{user.username}
                  </p>
                </div>
              </div>
              <ul className="flex flex-col opacity-100 space-y-4">
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
              </ul>
            </li>
          ))}
        </ul>
      </BrowserView>
      <MobileView renderWithFragment>
        <Accordion
          allowZeroExpanded
          className="gap-4 grid grid-cols-1 min-h-screen p-6 w-screen sm:px-20"
        >
          {users.map(user => (
            <AccordionItem key={`${user.id}--grid--mobile`}>
              <Card user={user} />
            </AccordionItem>
          ))}
        </Accordion>
      </MobileView>
    </>
  )
}
