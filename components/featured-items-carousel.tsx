import React from 'react'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'

import { cn } from '@/lib/utils'
import { useFeaturedItems } from '@/hooks/use-featured-items'

import ErrorCard from './error-card'
import { ImageOffIcon } from './icons'
import { Card, CardFooter } from './ui/card'
import { Skeleton } from './ui/skeleton'
import { H2, H3, H4 } from './ui/typography'

const { width: screenW } = Dimensions.get('window')
const cardW = screenW - 100
const cardH = 180

export function FeaturedItemsCarousel() {
  const { data, error, isLoading, refetch } = useFeaturedItems()

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

  return (
    <View>
      <H2 className="mx-2">Featured</H2>
      {data && data.length > 0 && (
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
                activeOpacity={0.9}
                className={cn('ml-2', {
                  'mr-2': isLastItem,
                })}
              >
                <Card style={{ width: cardW, height: cardH }} className="relative overflow-hidden">
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
                  <CardFooter className="absolute bottom-0 z-20 flex-col justify-start">
                    <View>
                      <H3
                        className={cn({
                          'text-white': item.imgUrl,
                        })}
                      >
                        {item.name}
                      </H3>
                      <H4
                        className={cn('opacity-70', {
                          'text-white': item.imgUrl,
                        })}
                      >
                        {item.category}
                      </H4>
                    </View>
                  </CardFooter>
                </Card>
              </TouchableOpacity>
            )
          }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
})
