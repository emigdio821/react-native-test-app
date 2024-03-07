import React, { useState } from 'react'
import { API_URL } from '@/constants/api'
import { ACCESS_TKN } from '@/constants/auth'
import type { UserResponse } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { isAxiosError } from 'axios'
import { router } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { Controller, useForm } from 'react-hook-form'
import { ActivityIndicator } from 'react-native'
import { Button, Card, Input, Label, ScrollView, Text, View, YStack } from 'tamagui'
import type { z } from 'zod'

import { signupSchema } from '@/lib/schemas/form'
import { storage } from '@/lib/storage'
import { Avocado } from '@/components/icons'

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
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Card m="$2">
        <Card.Header gap="$2">
          <View alignSelf="center">
            <Avocado width={48} height={48} />
          </View>
          <YStack>
            <YStack gap="$2">
              <Controller
                name="firstName"
                control={form.control}
                render={({ field }) => (
                  <YStack>
                    <Label htmlFor={`${field.name}-signup`}>First name</Label>
                    <Input
                      value={field.value}
                      onBlur={field.onBlur}
                      id={`${field.name}-signup`}
                      onChangeText={field.onChange}
                    />
                  </YStack>
                )}
              />
              {form.formState.errors.firstName && (
                <Text col="$red10">{form.formState.errors.firstName.message}</Text>
              )}
            </YStack>
            <YStack gap="$2">
              <Controller
                name="lastName"
                control={form.control}
                render={({ field }) => (
                  <YStack>
                    <Label htmlFor={`${field.name}-signup`}>Last name</Label>
                    <Input
                      value={field.value}
                      onBlur={field.onBlur}
                      id={`${field.name}-signup`}
                      onChangeText={field.onChange}
                    />
                  </YStack>
                )}
              />
              {form.formState.errors.lastName && (
                <Text col="$red10">{form.formState.errors.lastName.message}</Text>
              )}
            </YStack>
            <YStack gap="$2">
              <Controller
                name="email"
                control={form.control}
                render={({ field }) => (
                  <YStack>
                    <Label htmlFor={`${field.name}-signup`}>Email</Label>
                    <Input
                      value={field.value}
                      onBlur={field.onBlur}
                      id={`${field.name}-signup`}
                      onChangeText={field.onChange}
                    />
                  </YStack>
                )}
              />
              {form.formState.errors.email && (
                <Text col="$red10">{form.formState.errors.email.message}</Text>
              )}
            </YStack>
            <YStack gap="$2">
              <Controller
                name="password"
                control={form.control}
                render={({ field }) => (
                  <YStack>
                    <Label htmlFor={`${field.name}-signup`}>Password</Label>
                    <Input
                      secureTextEntry
                      value={field.value}
                      onBlur={field.onBlur}
                      id={`${field.name}-signup`}
                      onChangeText={field.onChange}
                    />
                  </YStack>
                )}
              />
              {form.formState.errors.password && (
                <Text col="$red10">{form.formState.errors.password.message}</Text>
              )}
            </YStack>
            <YStack gap="$2">
              <Controller
                name="avatarUrl"
                control={form.control}
                render={({ field }) => (
                  <YStack>
                    <Label htmlFor={`${field.name}-signup`}>Avatar URL</Label>
                    <Input
                      value={field.value}
                      onBlur={field.onBlur}
                      id={`${field.name}-signup`}
                      onChangeText={field.onChange}
                    />
                  </YStack>
                )}
              />
              {form.formState.errors.avatarUrl && (
                <Text col="$red10">{form.formState.errors.avatarUrl.message}</Text>
              )}
            </YStack>
          </YStack>

          {error && <Text col="$red10">{error}</Text>}

          <Button
            flexGrow={1}
            disabled={form.formState.isSubmitting}
            icon={form.formState.isSubmitting ? <ActivityIndicator /> : undefined}
            onPress={() => {
              void onSubmit()
            }}
          >
            Sign up
          </Button>
        </Card.Header>
      </Card>
    </ScrollView>
  )
}

export default SignUp
