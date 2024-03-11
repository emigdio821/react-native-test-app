import React, { useState } from 'react'
import type { User } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { router, useLocalSearchParams } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, View } from 'react-native'
import type { z } from 'zod'

import { borrowSchema } from '@/lib/schemas/form'
import { storage } from '@/lib/storage'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Text } from '@/components/ui/text'
import { H3, Muted } from '@/components/ui/typography'
import { DateTimePicker } from '@/components/date-time-picker'
import { Spinner } from '@/components/spinner'

const BorrowFormModal = () => {
  const [error, setError] = useState('')
  const userFromStorage = storage.getString('user')
  const user: User | null = userFromStorage ? JSON.parse(userFromStorage) : null
  const form = useForm<z.infer<typeof borrowSchema>>({
    defaultValues: {
      name: user?.firstname,
      lastName: user?.lastname,
      returnDate: '',
    },
    resolver: zodResolver(borrowSchema),
  })
  const { itemName, category } = useLocalSearchParams()

  const onSubmit = form.handleSubmit(async (values: z.infer<typeof borrowSchema>) => {
    setError('')
    form.clearErrors()
    try {
      router.navigate('/')
    } catch (err) {
      const errorMsg = 'Something went wrong while borrowing your item, try again'
      // if (isAxiosError(err)) {
      //   errorMsg = err.response?.data ?? err.message
      // }
      setError(errorMsg)
    }
  })

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Card className="m-2">
        <CardHeader>
          <Muted>{category}</Muted>
          <H3>{itemName}</H3>
        </CardHeader>
        <CardContent>
          <View className="gap-2">
            <View className="gap-1">
              <Label nativeID="name">Name</Label>
              <Controller
                name="name"
                control={form.control}
                render={({ field }) => (
                  <Input
                    nativeID="name"
                    value={field.value}
                    onBlur={field.onBlur}
                    readOnly={!!field.value}
                    onChangeText={field.onChange}
                  />
                )}
              />
              {form.formState.errors.name && (
                <Text className="text-destructive">{form.formState.errors.name.message}</Text>
              )}
            </View>

            <View className="gap-1">
              <Label nativeID="lastName">Last name</Label>
              <Controller
                name="lastName"
                control={form.control}
                render={({ field }) => (
                  <Input
                    nativeID="lastName"
                    value={field.value}
                    onBlur={field.onBlur}
                    readOnly={!!field.value}
                    onChangeText={field.onChange}
                  />
                )}
              />
              {form.formState.errors.lastName && (
                <Text className="text-destructive">{form.formState.errors.lastName.message}</Text>
              )}
            </View>

            <View className="gap-1">
              <Label nativeID="returnDate">Return date</Label>
              <Controller
                name="returnDate"
                control={form.control}
                render={() => (
                  <DateTimePicker
                    onChange={(date) => {
                      form.setValue('returnDate', date.toISOString(), {
                        shouldValidate: true,
                      })
                    }}
                  />
                )}
              />
              {form.formState.errors.returnDate && (
                <Text className="text-destructive">{form.formState.errors.returnDate.message}</Text>
              )}
            </View>
          </View>
          {error && <Text className="text-destructive">{error}</Text>}
        </CardContent>
        <CardFooter>
          <Button
            className="grow flex-row items-center"
            disabled={form.formState.isSubmitting}
            onPress={() => {
              void onSubmit()
            }}
          >
            <Text>Apply</Text>
            {form.formState.isSubmitting && <Spinner className="ml-2 text-primary-foreground" />}
          </Button>
        </CardFooter>
      </Card>
    </ScrollView>
  )
}

export default BorrowFormModal
