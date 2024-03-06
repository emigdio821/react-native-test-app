import React, { useState } from 'react'
import type { UserResponse } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { isAxiosError } from 'axios'
import { router, Stack } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { LogInIcon } from 'lucide-react-native'
import { Controller, useForm } from 'react-hook-form'
import { ActivityIndicator } from 'react-native'
import { Button, Card, Input, Label, Text, View, YStack } from 'tamagui'
import type { z } from 'zod'

import { loginSchema } from '@/lib/schemas/form'
import { storage } from '@/lib/storage'
import { Avocado } from '@/components/icons'

const LOGIN_EP = 'http://192.168.0.103:3000/login'

const Login = () => {
  const [error, setError] = useState('')
  const form = useForm<z.infer<typeof loginSchema>>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = form.handleSubmit(async (values: z.infer<typeof loginSchema>) => {
    form.clearErrors()
    try {
      const { data } = await axios.post<UserResponse>(LOGIN_EP, values)
      await SecureStore.setItemAsync('accessToken', data.accessToken)
      storage.set('user', JSON.stringify(data.user))
      router.navigate('/')
    } catch (err) {
      let errorMsg = 'Something went wrong while loggin in, try again'
      if (isAxiosError(err)) {
        console.log(JSON.stringify(err.response?.data, null, 2))
        errorMsg = err.response?.data ?? err.message
      }
      setError(errorMsg)
    }
  })

  return (
    <>
      <Stack.Screen options={{ headerTitle: 'Log in' }} />
      <View flex={1}>
        <Card m="$2" bordered>
          <Card.Header gap="$2">
            <View alignSelf="center">
              <Avocado width={48} height={48} />
            </View>
            <YStack>
              <Label htmlFor="email">Email</Label>
              <YStack gap="$2">
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <Input
                      id="email"
                      value={field.value}
                      onBlur={field.onBlur}
                      onChangeText={field.onChange}
                    />
                  )}
                />
                {form.formState.errors.email && (
                  <Text col="$red10">{form.formState.errors.email.message}</Text>
                )}
              </YStack>
              <Label htmlFor="password">Password</Label>
              <YStack gap="$2">
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <Input
                      id="password"
                      secureTextEntry
                      value={field.value}
                      onBlur={field.onBlur}
                      onChangeText={field.onChange}
                    />
                  )}
                />
                {form.formState.errors.password && (
                  <Text col="$red10">{form.formState.errors.password.message}</Text>
                )}
              </YStack>
            </YStack>

            {error && <Text col="$red10">{error}</Text>}

            <Button
              flexGrow={1}
              disabled={form.formState.isSubmitting}
              icon={form.formState.isSubmitting ? <ActivityIndicator /> : <LogInIcon />}
              onPress={() => {
                void onSubmit()
              }}
            >
              Log in
            </Button>
          </Card.Header>
        </Card>
      </View>
    </>
  )
}

export default Login
