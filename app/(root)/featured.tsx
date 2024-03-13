import React from 'react'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'

import { formatDate } from '@/lib/utils'
import { useFeaturedItems } from '@/hooks/use-featured-items'
import { Text } from '@/components/ui/text'
import { Small } from '@/components/ui/typography'
import ErrorCard from '@/components/error-card'
import { ChevronRightIcon } from '@/components/icons'
import { Spinner } from '@/components/spinner'

export default function FeaturedPage() {
  const { data, error, isLoading, refetch } = useFeaturedItems(true)

  if (isLoading) {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Spinner />
      </ScrollView>
    )
  }

  if (error) {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <ErrorCard
          msg={error.message}
          action={() => {
            void refetch()
          }}
        />
      </ScrollView>
    )
  }

  if (!data) {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <ErrorCard msg="No categories found" />
      </ScrollView>
    )
  }

  return (
    <FlatList
      data={data}
      contentInsetAdjustmentBehavior="automatic"
      keyExtractor={(item) => `${item.id}-${item.imgUrl}`}
      renderItem={({ item }) => (
        <TouchableOpacity
          activeOpacity={0.5}
          delayLongPress={250}
          onLongPress={() => {}}
          onPress={() => {
            router.navigate({
              pathname: '/category/item/[id]',
              params: {
                category: item.category,
                id: item.id,
                imgUrl: item.imgUrl,
                itemName: item.name,
                isBorrowed: item.isBorrowed,
                returnDate: item.returnDate,
              },
            })
          }}
        >
          <View className="flex-row items-center justify-between bg-card px-3 py-3">
            <View className="flex-row items-center gap-2">
              <View className="h-12 w-12 overflow-hidden rounded-lg">
                <Image
                  transition={300}
                  contentFit="cover"
                  source={item.imgUrl}
                  style={styles.image}
                />
              </View>
              <View>
                <Text className="font-semibold">{item.name}</Text>
                {item.isBorrowed ? (
                  <View className="gap-1 opacity-80">
                    <Small>Unavailable</Small>
                    {item.returnDate && (
                      <Small>Returning on {formatDate(new Date(item.returnDate))}</Small>
                    )}
                  </View>
                ) : (
                  <Small>Available</Small>
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

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
})
