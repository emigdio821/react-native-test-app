import React from 'react'
import { blackA, size } from '@tamagui/themes'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { ImageOffIcon as ImageOffIc } from 'lucide-react-native'
import { Dimensions, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Card, H3, H4, styled, Text, View } from 'tamagui'

import { useFeaturedItems } from '@/hooks/use-featured-items'

import ErrorCard from './error-card'

const { width: screenW } = Dimensions.get('window')
const BASE_SPACING = size['$0.75']
const cardW = screenW - 100
const cardH = 180

const FeaturedItemsCarousel = () => {
  const { data, error, isLoading, refetch } = useFeaturedItems()

  if (isLoading) {
    return (
      <View m="$2" gap="$2">
        <Card w="$11" h="$1" />
        <Card w={cardW} h={cardH} />
      </View>
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
    <View gap="$2">
      <H3 px="$2">Featured items</H3>
      {data && data.length > 0 && (
        <FlatList
          horizontal
          data={data}
          decelerationRate="fast"
          snapToInterval={cardW + BASE_SPACING}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}-${item.imgUrl}`}
          renderItem={({ item, index }) => {
            const isLastItem = index === data.length - 1
            const lastItemStyles = isLastItem ? styles.lastTouchableCard : null

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
                style={[styles.touchableCard, lastItemStyles]}
              >
                <Card style={styles.card} w={cardW} h={cardH}>
                  <Card.Footer p="$2" fd="column">
                    <H4 col="white">{item.name}</H4>
                    <Text col="$white075">{item.category}</Text>
                  </Card.Footer>
                  <Card.Background>
                    <View style={styles.bgMask} />
                    {item.imgUrl ? (
                      <Image
                        transition={300}
                        contentFit="cover"
                        style={styles.image}
                        source={item.imgUrl}
                      />
                    ) : (
                      <View bg="$color0" h="100%" justifyContent="center" alignItems="center">
                        <ImageOffIcon />
                      </View>
                    )}
                  </Card.Background>
                </Card>
              </TouchableOpacity>
            )
          }}
        />
      )}
    </View>
  )
}

const ImageOffIcon = styled(ImageOffIc, {
  color: '$color',
})

const styles = StyleSheet.create({
  bgMask: {
    backgroundColor: blackA.blackA10,
    height: '100%',
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
  card: {
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  lastTouchableCard: {
    marginEnd: BASE_SPACING,
  },
  touchableCard: {
    marginStart: BASE_SPACING,
  },
})

export default FeaturedItemsCarousel
