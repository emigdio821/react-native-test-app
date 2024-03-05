import React from 'react'
import type { MostBorrowedItem } from '@/apiMock/categories'
import { blackA, size } from '@tamagui/themes'
import { Image } from 'expo-image'
import { ImageOffIcon as ImageOffIc } from 'lucide-react-native'
import { Dimensions, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Card, styled, Text, View } from 'tamagui'

interface ImageCarouselProps {
  data: MostBorrowedItem[]
  withTitle?: boolean
  itemWidth?: number
  itemHeight?: number
  titleSize?: number
  onPress?: (dataItem: MostBorrowedItem) => void
}

const { width: screenW } = Dimensions.get('window')
const BASE_SPACING = size['$0.75']

const MBCarousel = (props: ImageCarouselProps) => {
  const { data, withTitle = true, onPress, itemWidth, itemHeight, titleSize } = props
  const cardW = screenW - (itemWidth ?? 100)
  const cardH = itemHeight ?? 180

  return (
    <FlatList
      horizontal
      data={data}
      decelerationRate="fast"
      snapToInterval={cardW + BASE_SPACING}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(img) => img.id.toString()}
      renderItem={({ item, index }) => {
        const isLastItem = index === data.length - 1
        const lastItemStyles = isLastItem ? styles.lastTouchableCard : null

        return (
          <TouchableOpacity
            onPress={() => {
              onPress && onPress(item)
            }}
            activeOpacity={0.9}
            style={[styles.touchableCard, lastItemStyles]}
          >
            <Card style={styles.card} w={cardW} h={cardH}>
              {withTitle && (
                <Card.Footer p="$2" fd="column">
                  <Text col="$white075">{item.category}</Text>
                  <Text col="white" fontWeight="800" fontSize={titleSize ?? 20}>
                    {item.name}
                  </Text>
                </Card.Footer>
              )}
              <Card.Background>
                <View style={withTitle ? styles.bgMask : null} />
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

export default MBCarousel
