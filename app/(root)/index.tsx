import React from 'react'
import { Text, View } from 'tamagui'

export default function Index() {
  // const { signOut } = useSession()

  const signOut = () => {}

  return (
    <View>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut()
        }}
      >
        Sign Out
      </Text>
    </View>
  )
}
