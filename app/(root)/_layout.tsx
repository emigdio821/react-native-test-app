import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { Text } from 'tamagui'

import useSession from '@/hooks/use-session'

export default function AppLayout() {
  const { user, isLoading } = useSession()
  console.log(JSON.stringify(user, null, 2))

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  if (!user) {
    return <Redirect href="/login" />
  }

  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {
          fontFamily: 'InterBold',
        },
      }}
    />
  )
}
