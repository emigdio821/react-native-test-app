import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { Platform } from 'react-native'
import { Text } from 'tamagui'

import useSession from '@/hooks/use-session'

export default function RootLayout() {
  const { user, isLoading } = useSession()

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  if (!user) {
    return <Redirect href="/(auth)/log-in" />
  }

  return (
    <Stack
      screenOptions={{
        headerLargeTitle: true,
        headerTransparent: Platform.OS === 'ios',
        headerBlurEffect: 'regular',
        headerLargeTitleStyle: {
          fontFamily: 'InterBold',
        },
        headerTitleStyle: {
          fontFamily: 'InterBold',
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false, headerTitle: 'Home' }} />
      <Stack.Screen name="test-view" options={{ headerTitle: 'Test page' }} />
      <Stack.Screen
        name="(modals)/edit-profile"
        options={{ headerTitle: 'Edit profile', headerBackTitle: 'Profile' }}
      />
      <Stack.Screen name="category/[id]" options={{ headerTitle: '' }} />
      <Stack.Screen name="category/item/[id]" options={{ headerTitle: 'Item details' }} />
      <Stack.Screen name="(modals)/borrow-form" options={{ headerTitle: 'Borrow' }} />
    </Stack>
  )
}
