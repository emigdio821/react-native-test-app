import React from 'react'
import { Link, Stack } from 'expo-router'
import { RabbitIcon as RabbitIc } from 'lucide-react-native'
import { Button, Card, Paragraph, styled } from 'tamagui'

const NotFoundScreen = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Card m="$2" bordered>
        <Card.Header alignItems="center">
          <RabbitIcon size={60} />
          <Paragraph>Seems like this screen does not exist</Paragraph>
        </Card.Header>
        <Card.Footer p="$2">
          <Link href="/" asChild>
            <Button w="100%">Return to home screen</Button>
          </Link>
        </Card.Footer>
        <Card.Background />
      </Card>
    </>
  )
}

const RabbitIcon = styled(RabbitIc, {
  name: 'RabbitIcon',
  color: '$color',
})

export default NotFoundScreen
