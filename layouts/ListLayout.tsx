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
      className="flex flex-col px-6 space-y-4 w-full sm:px-20 lg:w-2/3"
    >
      {users.map(user => (
        <AccordionItem key={`${user.id}--list`}>
          <Card user={user} />
        </AccordionItem>
      ))}
    </Accordion>
  )
}
