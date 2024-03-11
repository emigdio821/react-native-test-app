import React from 'react'
import { Stack } from 'expo-router'
import { Platform } from 'react-native'

const ProfileLayout = () => {
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
          headerTitle: 'Profile',
        }}
      />
      <Stack.Screen
        name="edit-profile"
        options={{
          headerTitle: 'Edit profile',
        }}
      />
    </Stack>
  )
}

export default ProfileLayout
