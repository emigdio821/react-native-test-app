import React from 'react'
import { Link, Stack } from 'expo-router'
import { Platform, Pressable } from 'react-native'

import { Text } from '@/components/ui/text'

const LoginLayout = () => {
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
        name="log-in"
        options={{
          headerTitle: 'Log in',
          headerRight: ({ tintColor }) => (
            <Link href="/sign-up" asChild>
              <Pressable>
                <Text style={{ color: tintColor }}>Sign up</Text>
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          headerTitle: 'Sign up',
        }}
      />
    </Stack>
  )
}

export default LoginLayout
