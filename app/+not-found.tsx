import React from 'react'
import { Link, Stack } from 'expo-router'
import { View } from 'react-native'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import { GhostIcon } from '@/components/icons'

export default function NotFoundScreen() {
  return (
    <View className="flex-1 justify-center">
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Card className="m-2">
        <CardHeader className="items-center justify-center">
          <GhostIcon size={32} className="text-primary" />
        </CardHeader>
        <CardContent>
          <Text className="text-center">Seems like this screen does not exist</Text>
        </CardContent>
        <CardFooter>
          <Link href="/" asChild>
            <Button className="grow">
              <Text>Return to home screen</Text>
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </View>
  )
}
