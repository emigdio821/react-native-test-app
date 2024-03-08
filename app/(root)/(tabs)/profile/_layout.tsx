import React from 'react'
import { Link, Stack } from 'expo-router'
import { Platform, Pressable } from 'react-native'
import { Text } from 'tamagui'

const ProfileLayout = () => {
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
          headerTitle: 'Profile',
          headerRight: () => (
            <Link href="/(root)/(tabs)/profile/edit-profile" asChild>
              <Pressable>
                <Text mr="$2" col="$accentColor">
                  Edit
                </Text>
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="edit-profile"
        options={{
          headerTitle: 'Edit profile',
          headerLargeTitle: false,
        }}
      />
    </Stack>
  )
}

export default ProfileLayout
