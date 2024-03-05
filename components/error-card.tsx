import React from 'react'
import { RabbitIcon as RabbitIc, RotateCwIcon } from 'lucide-react-native'
import { Button, Card, Paragraph, styled } from 'tamagui'

interface ErrorCardProps {
  msg?: string
  action?: () => void
}

const ErrorCard = ({ msg, action }: ErrorCardProps) => {
  return (
    <Card m="$2" bordered>
      <Card.Header alignItems="center">
        <RabbitIcon size={60} />
        <Paragraph>{msg ?? 'Something went wrong, try again'}</Paragraph>
      </Card.Header>
      <Card.Footer p="$2">
        {action && (
          <Button
            flexGrow={1}
            icon={<RotateCwIcon />}
            onPress={() => {
              action()
            }}
          >
            Reload
          </Button>
        )}
      </Card.Footer>
      <Card.Background />
    </Card>
  )
}

const RabbitIcon = styled(RabbitIc, {
  name: 'RabbitIcon',
  color: '$color',
})

export default ErrorCard
