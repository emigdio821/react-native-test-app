import React, { useState } from 'react'
import { router } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { Alert, ScrollView, Switch, View } from 'react-native'

import { ACCESS_TKN } from '@/lib/constants'
import { storage } from '@/lib/storage'
import { useColorScheme } from '@/hooks/use-color-scheme'
import useSession from '@/hooks/use-session'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Text } from '@/components/ui/text'
import { H3, Muted } from '@/components/ui/typography'
import { Spinner } from '@/components/spinner'

const ProfileTab = () => {
  const { user, isLoading } = useSession()
  const { colorScheme, isDarkColorScheme } = useColorScheme()
  const [loading, setLoading] = useState(false)
  const [darkMode, setDarkMode] = useState(isDarkColorScheme)
  const [systemTheme, setSystemTheme] = useState(true)
  const [allowNotif, setAllowNotif] = useState(true)

  async function handleLogOut() {
    try {
      setLoading(true)
      await SecureStore.deleteItemAsync(ACCESS_TKN)
      storage.delete('user')
      router.navigate('/(auth)/log-in')
    } catch (err) {
      Alert.alert('', 'Something went wrong while trying to log you out, try again', undefined, {
        userInterfaceStyle: colorScheme ?? undefined,
      })
    } finally {
      setLoading(false)
    }
  }

  function handleEditPress() {
    router.navigate('/(root)/(tabs)/profile/edit-profile')
  }

  function handleLogOutPress() {
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
        userInterfaceStyle: colorScheme,
      },
    )
  }

  if (isLoading) {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Spinner />
      </ScrollView>
    )
  }

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View className="w-full gap-2 p-2">
        <Card>
          <CardHeader>
            <Avatar alt="User avatar" className="h-24 w-24">
              <AvatarImage source={{ uri: user?.avatarUrl }} />
              <AvatarFallback>
                <Text>User</Text>
              </AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent>
            <H3>
              {user?.firstname} {user?.lastname}
            </H3>
            <Muted className="text-base">{user?.email}</Muted>
          </CardContent>
          <CardFooter className="gap-2">
            <Button variant="secondary" disabled={loading} onPress={handleEditPress}>
              <Text>Edit</Text>
            </Button>
            <Button variant="secondary" disabled={loading} onPress={handleLogOutPress}>
              <Text>Log out</Text>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <H3>Settings</H3>
          </CardHeader>
          <CardContent className="gap-2">
            <View className="flex-row items-center justify-between gap-2">
              <Label nativeID="airplane-mode">Dark mode</Label>
              <Switch disabled={systemTheme} onValueChange={setDarkMode} value={darkMode} />
            </View>
            <View className="flex-row items-center justify-between gap-2">
              <Label nativeID="airplane-mode">Follow device theme</Label>
              <Switch onValueChange={setSystemTheme} value={systemTheme} />
            </View>
            <View className="flex-row items-center justify-between gap-2">
              <Label nativeID="notifications">Allow notifications</Label>
              <Switch onValueChange={setAllowNotif} value={allowNotif} id="notifications" />
            </View>
            <Button variant="destructive">
              <Text>Delete my account</Text>
            </Button>
          </CardContent>
        </Card>
      </View>
    </ScrollView>
  )
}

export default ProfileTab
