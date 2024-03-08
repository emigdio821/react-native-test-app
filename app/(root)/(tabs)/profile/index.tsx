import React, { useState } from 'react'
import { ACCESS_TKN } from '@/constants/auth'
import { router } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { LogOutIcon } from 'lucide-react-native'
import { ActivityIndicator, Alert, useColorScheme } from 'react-native'
import { Avatar, Button, Card, H2, ScrollView, Text, View } from 'tamagui'

import { storage } from '@/lib/storage'
import useSession from '@/hooks/use-session'

const ProfileTab = () => {
  const { user, isLoading } = useSession()
  const [loading, setLoading] = useState(false)
  const scheme = useColorScheme()

  const handleLogOut = async () => {
    try {
      setLoading(true)
      await SecureStore.deleteItemAsync(ACCESS_TKN)
      storage.delete('user')
      router.navigate('/(auth)/log-in')
    } catch (err) {
      Alert.alert('', 'Something went wrong while trying to log you out, try again', undefined, {
        userInterfaceStyle: scheme ?? undefined,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleLogOutPress = () => {
    Alert.alert(
      'Log out',
      'Are you sure you want to perform this action?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          style: 'destructive',
          onPress: () => {
            void handleLogOut()
          },
        },
      ],
      {
        userInterfaceStyle: scheme ?? undefined,
      },
    )
  }

  if (isLoading) {
    return (
      <View flex={1} pt={16}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Card m="$2">
        <Card.Header alignItems="center">
          <Avatar circular size="$12">
            <Avatar.Image accessibilityLabel={user?.firstname} src={user?.avatarUrl} />
            <Avatar.Fallback bc="$accentColor" />
          </Avatar>
          <H2>
            {user?.firstname} {user?.lastname}
          </H2>
          <Text fontSize="$5">{user?.email}</Text>
        </Card.Header>
        <Card.Footer p="$2">
          <Button
            flexGrow={1}
            disabled={loading}
            onPress={handleLogOutPress}
            icon={loading ? <ActivityIndicator /> : <LogOutIcon />}
          >
            Log out
          </Button>
        </Card.Footer>
        <Card.Background />
      </Card>
    </ScrollView>
  )
}

export default ProfileTab
