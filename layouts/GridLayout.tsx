import * as React from 'react'
import { Accordion, AccordionItem } from 'react-accessible-accordion'

import { Card } from '@components/Card'
import { User } from '@interfaces/github'
interface Props {
  users: Array<User>
}

export const GridLayout: React.FC<Props> = ({ users }) => {
  return (
    <Accordion
      allowZeroExpanded
      className="bg-red-100 gap-4 grid grid-cols-1 min-h-screen p-6 w-screen sm:grid-cols-2 md:grid-cols-3"
    >
      {users.map(user => (
        <AccordionItem key={`${user.id}--grid`}>
          <Card user={user} />
        </AccordionItem>
      ))}
    </Accordion>
  )
}
