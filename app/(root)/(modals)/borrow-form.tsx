import React from 'react'
import type { User } from '@/types'
import { router, useLocalSearchParams } from 'expo-router'
import { CheckIcon } from 'lucide-react-native'
import {
  Button,
  Card,
  Checkbox,
  Form,
  H3,
  Input,
  Label,
  ScrollView,
  Text,
  XStack,
  YStack,
} from 'tamagui'

import { storage } from '@/lib/storage'
import DateTimePicker from '@/components/date-time-picker'

const BorrowFormModal = () => {
  const userFromStorage = storage.getString('user')
  const user: User | null = userFromStorage ? JSON.parse(userFromStorage) : null
  const { itemName, category } = useLocalSearchParams()
  // const navigation = useNavigation()

  // useEffect(() => {
  //   navigation.setOptions({ headerTitle: itemName ?? '' })
  // }, [navigation, itemName])

  function handleSubmit() {
    router.navigate('/')
  }

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Card m="$2">
        <Card.Header gap="$2">
          <YStack>
            <H3>{itemName}</H3>
            <Text color="$color05">{category}</Text>
          </YStack>
          <Form onSubmit={handleSubmit} gap={16}>
            <YStack>
              <YStack>
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={user?.firstname} />
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" defaultValue={user?.lastname} />
                <Label>Return date</Label>
                <DateTimePicker />
                <XStack alignItems="center" gap="$2">
                  <Checkbox id="terms">
                    <Checkbox.Indicator>
                      <CheckIcon />
                    </Checkbox.Indicator>
                  </Checkbox>
                  <Label htmlFor="terms">Accept terms and conditions.</Label>
                </XStack>
              </YStack>
            </YStack>
            <Form.Trigger asChild>
              <Button flexGrow={1}>Apply</Button>
            </Form.Trigger>
          </Form>
        </Card.Header>
      </Card>
    </ScrollView>
  )
}

export default BorrowFormModal
