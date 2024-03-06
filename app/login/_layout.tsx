import React from 'react'
import { Stack } from 'expo-router'

const LoginLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerTitle: 'Log in',
        headerTitleStyle: {
          fontFamily: 'InterBold',
        },
      }}
    />
  )
}

export default LoginLayout
