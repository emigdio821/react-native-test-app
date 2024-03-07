import React, { useEffect, useState } from 'react'
import { API_URL } from '@/constants/api'
import { ACCESS_TKN } from '@/constants/auth'
import type { FullUser } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { isAxiosError } from 'axios'
import * as ImagePicker from 'expo-image-picker'
import * as SecureStore from 'expo-secure-store'
// import { router } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { ActivityIndicator, Alert, Pressable } from 'react-native'
import { Avatar, Button, Card, Input, Label, ScrollView, Text, YStack } from 'tamagui'
import type { z } from 'zod'

import { updateProfileSchema } from '@/lib/schemas/form'
import { storage } from '@/lib/storage'
import useSession from '@/hooks/use-session'

const USERS_EP = `${API_URL}/users`

interface EditPayload {
  firstname: string
  lastname: string
  email: string
  avatarUrl: string
  password?: string
}

const EditProfileModal = () => {
  const { user } = useSession()
  const [error, setError] = useState('')
  const form = useForm<z.infer<typeof updateProfileSchema>>({
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      avatarUrl: '',
    },
    resolver: zodResolver(updateProfileSchema),
  })

  const onCaptureImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.75,
      base64: true,
    })

    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`
      form.setValue('avatarUrl', base64)
    }
  }

  const onSubmit = form.handleSubmit(async (values: z.infer<typeof updateProfileSchema>) => {
    setError('')
    form.clearErrors()
    try {
      const AT = await SecureStore.getItemAsync(ACCESS_TKN)
      const { data: userData } = await axios.get<FullUser>(`${USERS_EP}/${user?.id}`, {
        headers: {
          Authorization: `Bearer ${AT}`,
        },
      })

      const payload: EditPayload = {
        firstname: values.firstname || userData.firstname,
        lastname: values.lastname || userData.lastname,
        email: values.email || userData.email,
        avatarUrl: values.avatarUrl || userData.avatarUrl,
      }

      if (values.password) {
        payload.password = values.password
      }

      const { data } = await axios.patch(`${USERS_EP}/${user?.id}`, payload, {
        headers: {
          Authorization: `Bearer ${AT}`,
        },
      })

      storage.set('user', JSON.stringify(data))
      Alert.alert('', 'Your profile has been updated')
    } catch (err) {
      let errorMsg = 'Something went wrong while updating your profile, try again'
      if (isAxiosError(err)) {
        errorMsg = err.response?.data ?? err.message
      }
      setError(errorMsg)
    }
  })

  useEffect(() => {
    if (user) {
      form.reset({
        firstname: user.firstname,
        lastname: user.lastname,
        avatarUrl: user.avatarUrl,
        email: user.email,
      })
    }
  }, [user, form])

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Card my="$2">
        <Card.Header gap="$2">
          <Pressable
            onPress={() => {
              void onCaptureImage()
            }}
          >
            <Avatar circular size="$10" alignSelf="center">
              <Avatar.Image accessibilityLabel="Powder" src={user?.avatarUrl} />
              <Avatar.Fallback bc="$accentColor" />
            </Avatar>
          </Pressable>

          <YStack>
            <YStack gap="$2">
              <Controller
                name="firstname"
                control={form.control}
                render={({ field }) => (
                  <YStack>
                    <Label htmlFor={`${field.name}-update-profile`}>First name</Label>
                    <Input
                      value={field.value}
                      onBlur={field.onBlur}
                      id={`${field.name}-update-profile`}
                      onChangeText={field.onChange}
                    />
                  </YStack>
                )}
              />
              {form.formState.errors.firstname && (
                <Text col="$red10">{form.formState.errors.firstname.message}</Text>
              )}
            </YStack>
            <YStack gap="$2">
              <Controller
                name="lastname"
                control={form.control}
                render={({ field }) => (
                  <YStack>
                    <Label htmlFor={`${field.name}-update-profile`}>Last name</Label>
                    <Input
                      value={field.value}
                      onBlur={field.onBlur}
                      id={`${field.name}-update-profile`}
                      onChangeText={field.onChange}
                    />
                  </YStack>
                )}
              />
              {form.formState.errors.lastname && (
                <Text col="$red10">{form.formState.errors.lastname.message}</Text>
              )}
            </YStack>
            <YStack gap="$2">
              <Controller
                name="email"
                control={form.control}
                render={({ field }) => (
                  <YStack>
                    <Label htmlFor={`${field.name}-update-profile`}>Email</Label>
                    <Input
                      value={field.value}
                      onBlur={field.onBlur}
                      id={`${field.name}-update-profile`}
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
                    <Label htmlFor={`${field.name}-update-profile`}>Password</Label>
                    <Input
                      secureTextEntry
                      value={field.value}
                      onBlur={field.onBlur}
                      id={`${field.name}-update-profile`}
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
                    <Label htmlFor={`${field.name}-update-profile`}>Avatar URL</Label>
                    <Input
                      value={field.value}
                      onBlur={field.onBlur}
                      id={`${field.name}-update-profile`}
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
            Update
          </Button>
        </Card.Header>
        <Card.Background />
      </Card>
    </ScrollView>
  )
}

export default EditProfileModal
