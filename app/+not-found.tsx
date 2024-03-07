import React from 'react'
import { Link, Stack } from 'expo-router'
import { GhostIcon } from 'lucide-react-native'
import { Button, Card, Paragraph, styled, View } from 'tamagui'

const NotFoundScreen = () => {
  return (
    <View flex={1} bg="$background" justifyContent="center">
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Card m="$2">
        <Card.Header alignItems="center">
          <StyledGhostIcon size={32} />
          <Paragraph>Seems like this screen does not exist</Paragraph>
        </Card.Header>
        <Card.Footer p="$2">
          <Link href="/" asChild>
            <Button w="100%">Return to home screen</Button>
          </Link>
        </Card.Footer>
        <Card.Background />
      </Card>
    </View>
  )
}

const StyledGhostIcon = styled(GhostIcon, {
  name: 'StyledGhostIcon',
  color: '$accentColor',
})

export default NotFoundScreen
