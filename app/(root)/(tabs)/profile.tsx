import React from 'react'
import { LogOutIcon } from 'lucide-react-native'
import { Alert } from 'react-native'
import { Avatar, Button, Card, H2, Text } from 'tamagui'

import { formatDate } from '@/lib/utils'

const AVATAR_URL = 'https://i.pinimg.com/474x/b4/44/06/b44406b163f1e54aa7408fb86d31bfb1.jpg'

export default function ProfileTab() {
  return (
    <Card m="$2" bordered>
      <Card.Header alignItems="center">
        <Avatar circular size="$12">
          <Avatar.Image accessibilityLabel="Powder" src={AVATAR_URL} />
          <Avatar.Fallback bc="$accentColor" />
        </Avatar>
        <H2>Jinx Powder</H2>
        <Text fontSize="$5">jinx@powder.com</Text>
        <Text opacity={0.8}>Since {formatDate(new Date())}</Text>
      </Card.Header>
      <Card.Footer p="$2">
        <Button
          onPress={() => {
            Alert.alert('WIP')
          }}
          width="100%"
          icon={<LogOutIcon />}
        >
          Log out
        </Button>
      </Card.Footer>
      <Card.Background />
    </Card>
  )
}
