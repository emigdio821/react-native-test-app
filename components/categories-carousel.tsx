import React from 'react'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { Dimensions, FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'

import { cn } from '@/lib/utils'
import { useCategories } from '@/hooks/use-categories'

import ErrorCard from './error-card'
import { ImageOffIcon } from './icons'
import { Card, CardFooter } from './ui/card'
import { Skeleton } from './ui/skeleton'
import { H2, H3 } from './ui/typography'

const { width: screenW } = Dimensions.get('window')
const cardW = screenW - 100
const cardH = 180

export function CategoriesCarousel() {
  const { data, error, isLoading, refetch } = useCategories()

  if (isLoading) {
    return (
      <Card className="m-2 justify-end gap-2 p-2" style={{ width: cardW, height: cardH }}>
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-2 w-12" />
      </Card>
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

  if (!data) {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <ErrorCard msg="No items found" />
      </ScrollView>
    )
  }

  return (
    <View className="gap-2">
      <H2 className="mx-2">Categories</H2>
      <FlatList
        horizontal
        data={data}
        // decelerationRate="fast"
        // snapToInterval={cardW + BASE_SPACING}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => `${item.id}-${item.imgUrl}`}
        renderItem={({ item, index }) => {
          const isLastItem = index === data.length - 1

          return (
            <TouchableOpacity
              onPress={() => {
                router.navigate({
                  pathname: '/category/[id]',
                  params: {
                    id: item.id,
                    category: item.name,
                  },
                })
              }}
              activeOpacity={0.9}
              className={cn('ml-2', {
                'mr-2': isLastItem,
              })}
            >
              <Card
                style={{ width: cardW, height: cardH }}
                className="relative overflow-hidden border-0"
              >
                {!item.imgUrl ? (
                  <View className="m-2 items-center justify-center rounded-lg bg-muted px-4 py-10">
                    <ImageOffIcon className="text-foreground" />
                  </View>
                ) : (
                  <>
                    <View className="absolute z-10 h-full w-full bg-black/60" />
                    <View className="absolute h-full w-full">
                      <Image
                        transition={300}
                        contentFit="cover"
                        style={styles.image}
                        source={item.imgUrl}
                      />
                    </View>
                  </>
                )}
                <CardFooter className="absolute bottom-0 z-20">
                  <H3
                    className={cn({
                      'text-white': item.imgUrl,
                    })}
                  >
                    {item.name}
                  </H3>
                </CardFooter>
              </Card>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
})
