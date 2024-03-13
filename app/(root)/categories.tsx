import React from 'react'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'

import { useCategories } from '@/hooks/use-categories'
import { Text } from '@/components/ui/text'
import ErrorCard from '@/components/error-card'
import { ChevronRightIcon } from '@/components/icons'
import { Spinner } from '@/components/spinner'

export default function CategoriesPage() {
  const { data, error, isLoading, refetch } = useCategories(true)

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
              pathname: '/category/[id]',
              params: {
                id: item.id,
                category: item.name,
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
