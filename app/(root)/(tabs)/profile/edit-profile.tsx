import React, { useState } from 'react'
import type { FullUser, User } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { isAxiosError } from 'axios'
import * as ImagePicker from 'expo-image-picker'
import * as SecureStore from 'expo-secure-store'
import { Controller, useForm } from 'react-hook-form'
import { ActivityIndicator, Alert, Pressable, ScrollView, View } from 'react-native'
import type { z } from 'zod'

import { ACCESS_TKN, API_URL } from '@/lib/constants'
import { updateProfileSchema } from '@/lib/schemas/form'
import { storage } from '@/lib/storage'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Text } from '@/components/ui/text'

const USERS_EP = `${API_URL}/users`

interface EditPayload {
  firstname: string
  lastname: string
  email: string
  avatarUrl: string
  password?: string
}

const EditProfileModal = () => {
  const userFromStorage = storage.getString('user')
  const user: User | null = userFromStorage ? JSON.parse(userFromStorage) : null

  const [error, setError] = useState('')
  const form = useForm<z.infer<typeof updateProfileSchema>>({
    defaultValues: {
      firstname: user?.firstname ?? '',
      lastname: user?.lastname ?? '',
      avatarUrl: user?.avatarUrl ?? '',
      email: user?.email ?? '',
      password: '',
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

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" automaticallyAdjustKeyboardInsets>
      <Card className="m-2">
        <CardHeader>
          <Pressable
            onPress={() => {
              void onCaptureImage()
            }}
          >
            <Avatar alt="User avatar" className="h-24 w-24">
              <AvatarImage source={{ uri: user?.avatarUrl }} />
              <AvatarFallback>
                <Text>User</Text>
              </AvatarFallback>
            </Avatar>
          </Pressable>
        </CardHeader>
        <CardContent>
          <View className="gap-2">
            <View className="gap-1">
              <Controller
                name="firstname"
                control={form.control}
                render={({ field }) => (
                  <>
                    <Label nativeID={`${field.name}-update-profile`}>First name</Label>
                    <Input
                      value={field.value}
                      onBlur={field.onBlur}
                      id={`${field.name}-update-profile`}
                      onChangeText={field.onChange}
                    />
                  </>
                )}
              />
              {form.formState.errors.firstname && (
                <Text className="text-destructive">{form.formState.errors.firstname.message}</Text>
              )}
            </View>
            <View className="gap-1">
              <Controller
                name="lastname"
                control={form.control}
                render={({ field }) => (
                  <>
                    <Label nativeID={`${field.name}-update-profile`}>Last name</Label>
                    <Input
                      value={field.value}
                      onBlur={field.onBlur}
                      id={`${field.name}-update-profile`}
                      onChangeText={field.onChange}
                    />
                  </>
                )}
              />
              {form.formState.errors.lastname && (
                <Text className="text-destructive">{form.formState.errors.lastname.message}</Text>
              )}
            </View>
            <View className="gap-1">
              <Controller
                name="email"
                control={form.control}
                render={({ field }) => (
                  <>
                    <Label nativeID={`${field.name}-update-profile`}>Email</Label>
                    <Input
                      value={field.value}
                      onBlur={field.onBlur}
                      id={`${field.name}-update-profile`}
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
                    <Label nativeID={`${field.name}-update-profile`}>Password</Label>
                    <Input
                      secureTextEntry
                      value={field.value}
                      onBlur={field.onBlur}
                      id={`${field.name}-update-profile`}
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
                    <Label nativeID={`${field.name}-update-profile`}>Avatar URL</Label>
                    <Input
                      value={field.value}
                      onBlur={field.onBlur}
                      id={`${field.name}-update-profile`}
                      onChangeText={field.onChange}
                    />
                  </>
                )}
              />
              {form.formState.errors.avatarUrl && (
                <Text className="text-destructive">{form.formState.errors.avatarUrl.message}</Text>
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
            <Text>Update</Text>
            {form.formState.isSubmitting && <ActivityIndicator className="ml-2" />}
          </Button>
        </CardFooter>
      </Card>
    </ScrollView>
  )
}

export default EditProfileModal
