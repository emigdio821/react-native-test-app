import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import { Pressable } from 'react-native'
import { Avatar, Button, Card, Input, Label, YStack } from 'tamagui'

const AVATAR_URL = 'https://i.pinimg.com/474x/b4/44/06/b44406b163f1e54aa7408fb86d31bfb1.jpg'

export default function ProfileModal() {
  const [avatar, setAvatar] = useState(AVATAR_URL)

  async function onCaptureImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.75,
      base64: true,
    })

    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`
      setAvatar(base64)
    }
  }

  return (
    <Card m={12} bordered>
      <Card.Header alignItems="center">
        <Pressable
          onPress={() => {
            void onCaptureImage()
          }}
        >
          <Avatar circular size="$12">
            <Avatar.Image accessibilityLabel="Powder" src={avatar} />
            <Avatar.Fallback bc="$accentColor" />
          </Avatar>
        </Pressable>
        <YStack w="100%">
          <Label m={0} htmlFor="name">
            Name
          </Label>
          <Input id="name" defaultValue="Jinx" />
        </YStack>
        <YStack w="100%">
          <Label htmlFor="lastName">Last name</Label>
          <Input id="lastName" defaultValue="Powder" />
        </YStack>
      </Card.Header>
      <Card.Footer p={12}>
        <Button
          onPress={() => {
            router.navigate('/(tabs)/profile')
          }}
          mt={12}
          width="100%"
        >
          Update
        </Button>
      </Card.Footer>
      <Card.Background />
    </Card>
  )
}
