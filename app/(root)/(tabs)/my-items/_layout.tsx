import React from 'react'
import { Stack } from 'expo-router'
import { Platform } from 'react-native'

const MyItemsLayout = () => {
  const isiOS = Platform.OS === 'ios'

  return (
    <Stack
      screenOptions={{
        headerLargeTitle: isiOS,
        headerTransparent: isiOS,
        headerBlurEffect: isiOS ? 'regular' : undefined,
        headerLargeTitleStyle: {
          fontFamily: 'InterBold',
        },
        headerTitleStyle: {
          fontFamily: 'InterBold',
        },
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

export default MyItemsLayout
