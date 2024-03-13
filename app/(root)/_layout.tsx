import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { Platform, SafeAreaView } from 'react-native'

import useSession from '@/hooks/use-session'
import { Spinner } from '@/components/spinner'

export default function RootLayout() {
  const isiOS = Platform.OS === 'ios'
  const { user, isLoading } = useSession()

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <Spinner className="m-2" />
      </SafeAreaView>
    )
  }

  if (!user) {
    return <Redirect href="/(auth)/log-in" />
  }

  return (
    <Stack
      screenOptions={{
        headerLargeTitle: isiOS,
        // headerTransparent: isiOS,
        // headerBlurEffect: isiOS ? 'regular' : undefined,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false, headerTitle: 'Home' }} />
      <Stack.Screen name="qr-scanner" options={{ headerTitle: 'QR scanner' }} />
      <Stack.Screen name="categories" options={{ headerTitle: 'Categories' }} />
      <Stack.Screen name="featured" options={{ headerTitle: 'Featured' }} />
      <Stack.Screen name="category/[id]" options={{ headerTitle: '' }} />
      <Stack.Screen name="category/item/[id]" options={{ headerTitle: 'Item details' }} />
      <Stack.Screen name="(modals)/borrow-form" options={{ headerTitle: 'Borrow' }} />
    </Stack>
  )
}
