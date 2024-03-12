import React from 'react'
import type { User } from '@/types'
import { router } from 'expo-router'
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native'

import { storage } from '@/lib/storage'
import { formatDate } from '@/lib/utils'
import { useMyItems } from '@/hooks/use-myitems'
import { Text } from '@/components/ui/text'
import { Small } from '@/components/ui/typography'
import ErrorCard from '@/components/error-card'
import { ChevronRightIcon } from '@/components/icons'
import { Spinner } from '@/components/spinner'

const MyItems = () => {
  const userFromStorage = storage.getString('user')
  const user: User | null = userFromStorage ? JSON.parse(userFromStorage) : null
  const { data, isLoading, refetch, error } = useMyItems(user?.id ?? '')

  if (isLoading) {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Spinner className="m-2" />
      </ScrollView>
    )
  }

  if (error) {
    return (
      <ErrorCard
        msg={error.message}
        action={() => {
          void refetch()
        }}
      />
    )
  }

  if (!data)
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <ErrorCard
          msg="No items found"
          action={() => {
            void refetch()
          }}
        />
      </ScrollView>
    )

  return (
    <FlatList
      data={data.items}
      contentInsetAdjustmentBehavior="automatic"
      keyExtractor={(item) => `${item.id}-${item.imgUrl}`}
      renderItem={({ item }) => (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            router.navigate({
              pathname: '/my-items/[id]',
              params: {
                category: item.category,
                imgUrl: item.imgUrl,
                itemName: item.name,
                returnDate: item.returnDate,
                borrowedDate: item.borrowedDate,
              },
            })
          }}
        >
          <View className="flex-row items-center justify-between bg-card p-3">
            <View>
              <Text className="font-semibold">{item.name}</Text>
              <View className="gap-1 opacity-80">
                {item.returnDate && (
                  <Small>Return it on {formatDate(new Date(item.returnDate))}</Small>
                )}
              </View>
            </View>
            <ChevronRightIcon size={16} className="text-foreground" />
          </View>
        </TouchableOpacity>
      )}
    />
  )
}

export default MyItems
