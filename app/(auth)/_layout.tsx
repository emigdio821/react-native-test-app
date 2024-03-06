import React from 'react'
import { Link, Stack } from 'expo-router'
import { Pressable } from 'react-native'
import { Text } from 'tamagui'

const LoginLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: 'center',
        // headerLargeTitle: true,
        headerTitleStyle: {
          fontFamily: 'InterBold',
        },
      }}
    >
      <Stack.Screen
        name="log-in"
        options={{
          headerTitle: 'Log in',
          headerRight: () => (
            <Link href="/sign-up" asChild>
              <Pressable>
                <Text mr="$2" col="$accentColor">
                  Sign up
                </Text>
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen name="sign-up" options={{ headerTitle: 'Sign up', presentation: 'modal' }} />
    </Stack>
  )
}

export default LoginLayout
