import React from 'react'
import { Stack } from 'expo-router'
import { Platform } from 'react-native'

export default function MyItemsLayout() {
  const isiOS = Platform.OS === 'ios'

  return (
    <Stack
      screenOptions={{
        headerLargeTitle: isiOS,
        // headerTransparent: isiOS,
        // headerBlurEffect: isiOS ? 'regular' : undefined,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'My items',
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: 'Item details',
        }}
      />
    </Stack>
  )
}
