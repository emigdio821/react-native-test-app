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
import { signupSchema } from '@/lib/schemas/form'
import { storage } from '@/lib/storage'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Text } from '@/components/ui/text'

const LOGIN_EP = `${API_URL}/login`

const SignUp = () => {
  const [error, setError] = useState('')
  const form = useForm<z.infer<typeof signupSchema>>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      avatarUrl: '',
    },
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = form.handleSubmit(async (values: z.infer<typeof signupSchema>) => {
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
          <CardContent className="p-6">
            <View className="gap-2">
              <View className="gap-1">
                <Controller
                  name="firstName"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <Label nativeID={`${field.name}-signup`}>First name</Label>
                      <Input
                        value={field.value}
                        onBlur={field.onBlur}
                        id={`${field.name}-signup`}
                        onChangeText={field.onChange}
                      />
                    </>
                  )}
                />
                {form.formState.errors.firstName && (
                  <Text className="text-destructive">
                    {form.formState.errors.firstName.message}
                  </Text>
                )}
              </View>

              <View className="gap-1">
                <Controller
                  name="lastName"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <Label nativeID={`${field.name}-signup`}>Last name</Label>
                      <Input
                        value={field.value}
                        onBlur={field.onBlur}
                        id={`${field.name}-signup`}
                        onChangeText={field.onChange}
                      />
                    </>
                  )}
                />
                {form.formState.errors.lastName && (
                  <Text className="text-destructive">{form.formState.errors.lastName.message}</Text>
                )}
              </View>

              <View className="gap-1">
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <Label nativeID={`${field.name}-signup`}>Email</Label>
                      <Input
                        value={field.value}
                        onBlur={field.onBlur}
                        id={`${field.name}-signup`}
                        onChangeText={field.onChange}
                      />
                    </>
                  )}
                />
                {form.formState.errors.email && (
                  <Text className="text-destructive">{form.formState.errors.email.message}</Text>
                )}
              </View>

              <View className="gap-1">
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <Label nativeID={`${field.name}-signup`}>Password</Label>
                      <Input
                        secureTextEntry
                        value={field.value}
                        onBlur={field.onBlur}
                        id={`${field.name}-signup`}
                        onChangeText={field.onChange}
                      />
                    </>
                  )}
                />
                {form.formState.errors.password && (
                  <Text className="text-destructive">{form.formState.errors.password.message}</Text>
                )}
              </View>

              <View className="gap-1">
                <Controller
                  name="avatarUrl"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <Label nativeID={`${field.name}-signup`}>Avatar URL</Label>
                      <Input
                        value={field.value}
                        onBlur={field.onBlur}
                        id={`${field.name}-signup`}
                        onChangeText={field.onChange}
                      />
                    </>
                  )}
                />
                {form.formState.errors.avatarUrl && (
                  <Text className="text-destructive">
                    {form.formState.errors.avatarUrl.message}
                  </Text>
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

export default SignUp
