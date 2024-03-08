import React from 'react'
import { Stack } from 'expo-router'
import { Platform } from 'react-native'

const HomeLayout = () => {
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
          headerTitle: 'Home',
        }}
      />
    </Stack>
  )
}

export default HomeLayout
