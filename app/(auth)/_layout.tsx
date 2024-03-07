import React from 'react'
import { Link, Stack } from 'expo-router'
import { Pressable } from 'react-native'
import { Text } from 'tamagui'

const LoginLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerLargeTitle: true,
        headerTransparent: true,
        headerBlurEffect: 'regular',
        headerLargeTitleStyle: {
          fontFamily: 'InterBold',
        },
        headerTitleStyle: {
          fontFamily: 'InterBold',
        },
      }}
    >
      <Stack.Screen
        name="log-in"
        options={{
          headerTitle: 'Log in',
          headerRight: ({ tintColor }) => (
            <Link href="/sign-up" asChild>
              <Pressable>
                <Text mr="$2" col={tintColor}>
                  Sign up
                </Text>
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
