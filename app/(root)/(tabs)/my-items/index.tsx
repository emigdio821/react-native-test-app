import React from 'react'
import { router } from 'expo-router'
import { ActivityIndicator, FlatList, ScrollView, TouchableOpacity, View } from 'react-native'

import { formatDate } from '@/lib/utils'
import { useMyItems } from '@/hooks/use-myitems'
import { Text } from '@/components/ui/text'
import { Small } from '@/components/ui/typography'
import { ChevronRightIcon } from '@/components/icons'

const MyItems = () => {
  const { data, isLoading } = useMyItems('0')

  if (isLoading) {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <ActivityIndicator />
      </ScrollView>
    )
  }

  if (!data) return <Text>no data...</Text>

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
          <View className="flex-row items-center justify-between px-2 py-3">
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
