import React from 'react'
import { GhostIcon, RotateCwIcon } from 'lucide-react-native'
import { Button, Card, Paragraph, styled } from 'tamagui'

interface ErrorCardProps {
  msg?: string
  action?: () => void
}

const ErrorCard = ({ msg, action }: ErrorCardProps) => {
  return (
    <Card m="$2">
      <Card.Header alignItems="center">
        <StyledGhostIcon size={32} />
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

const StyledGhostIcon = styled(GhostIcon, {
  name: 'StyledGhostIcon',
  color: '$accentColor',
})

export default ErrorCard
