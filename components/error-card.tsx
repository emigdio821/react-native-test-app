import React from 'react'

import { GhostIcon } from '@/components/icons'

import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { Text } from './ui/text'

interface ErrorCardProps {
  msg?: string
  action?: () => void
}

const ErrorCard = ({ msg, action }: ErrorCardProps) => {
  return (
    <Card className="m-2">
      <CardHeader className="mx-auto">
        <GhostIcon size={32} className="text-primary" />
      </CardHeader>
      <CardContent>
        <Text className="text-center">{msg ?? 'Something went wrong, try again'}</Text>
      </CardContent>
      {action && (
        <CardFooter>
          <Button
            className="grow"
            onPress={() => {
              action()
            }}
          >
            <Text>Reload</Text>
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

export default ErrorCard
