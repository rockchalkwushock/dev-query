import * as React from 'react'
import { Accordion, AccordionItem } from 'react-accessible-accordion'

import { Card } from '@components/Card'
import { User } from '@interfaces/github'
interface Props {
  users: Array<User>
}

export const ListLayout: React.FC<Props> = ({ users }) => {
  return (
    <Accordion
      allowZeroExpanded
      className="bg-blue-100 flex flex-col min-h-screen p-6 space-y-4 w-screen sm:px-20 lg:px-96"
    >
      {users.map(user => (
        <AccordionItem key={`${user.id}--list`}>
          <Card user={user} />
        </AccordionItem>
      ))}
    </Accordion>
  )
}
