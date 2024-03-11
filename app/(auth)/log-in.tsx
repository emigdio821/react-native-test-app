import React, { useState } from 'react'
import type { UserResponse } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { isAxiosError } from 'axios'
import { router } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { Controller, useForm } from 'react-hook-form'
import { ActivityIndicator, ScrollView, View } from 'react-native'
import type { z } from 'zod'

import { ACCESS_TKN, API_URL } from '@/lib/constants'
import { loginSchema } from '@/lib/schemas/form'
import { storage } from '@/lib/storage'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Text } from '@/components/ui/text'
import { Avocado } from '@/components/icons'

const LOGIN_EP = `${API_URL}/login`

const LogIn = () => {
  const [error, setError] = useState('')
  const form = useForm<z.infer<typeof loginSchema>>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = form.handleSubmit(async (values: z.infer<typeof loginSchema>) => {
    setError('')
    form.clearErrors()
    try {
      const { data } = await axios.post<UserResponse>(LOGIN_EP, values)
      await SecureStore.setItemAsync(ACCESS_TKN, data.accessToken)
      storage.set('user', JSON.stringify(data.user))
      router.navigate('/')
    } catch (err) {
      let errorMsg = 'Something went wrong while loggin in, try again'
      if (isAxiosError(err)) {
        errorMsg = err.response?.data ?? err.message
      }
      setError(errorMsg)
    }
  })

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" automaticallyAdjustKeyboardInsets>
      <View className="w-full p-4">
        <Card className="w-full">
          <CardHeader>
            <View className="mb-2 self-center">
              <Avocado width={48} height={48} />
            </View>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>Sign in below, or sign up above</CardDescription>
          </CardHeader>
          <CardContent>
            <View className="gap-2">
              <View className="gap-1">
                <Label nativeID="email">Email</Label>
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <Input
                      nativeID="email"
                      value={field.value}
                      onBlur={field.onBlur}
                      onChangeText={field.onChange}
                    />
                  )}
                />
                {form.formState.errors.email && (
                  <Text className="text-destructive">{form.formState.errors.email.message}</Text>
                )}
              </View>

              <View className="gap-1">
                <Label nativeID="password">Password</Label>
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <Input
                      secureTextEntry
                      nativeID="password"
                      value={field.value}
                      onBlur={field.onBlur}
                      onChangeText={field.onChange}
                    />
                  )}
                />
                {form.formState.errors.password && (
                  <Text className="text-destructive">{form.formState.errors.password.message}</Text>
                )}
              </View>
            </View>
            {error && <Text className="text-destructive">{error}</Text>}
          </CardContent>
          <CardFooter>
            <Button
              className="grow"
              disabled={form.formState.isSubmitting}
              onPress={() => {
                void onSubmit()
              }}
            >
              <Text>Log in {form.formState.isSubmitting && <ActivityIndicator />}</Text>
            </Button>
          </CardFooter>
        </Card>
      </View>
    </ScrollView>
  )
}

export default LogIn
