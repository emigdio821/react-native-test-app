import React from 'react'
import { Image } from 'expo-image'
import { router, useLocalSearchParams } from 'expo-router'
import { BanIcon, ImageOffIcon as ImageOffIc, SmilePlusIcon } from 'lucide-react-native'
import { Button, Card, H3, ScrollView, styled, Text, View, YStack } from 'tamagui'

import { formatDate } from '@/lib/utils'

const CategoryItemPage = () => {
  const { itemName, category, imgUrl, isBorrowed, returnDate } = useLocalSearchParams()
  const borrowed = isBorrowed === 'true'
  const date = new Date(returnDate as string)
  const returningDate = returnDate ? formatDate(date) : null

  function handleBorrowingProcess() {
    router.navigate({
      pathname: '/(modals)/borrow-form',
      params: {
        itemName,
        category,
        imgUrl,
      },
    })
  }

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Card m="$2">
        <Card.Header gap="$2">
          {imgUrl ? (
            <ImageContainer>
              <ItemImg source={imgUrl} transition={300} contentFit="cover" />
            </ImageContainer>
          ) : (
            <ImageContainer alignItems="center" justifyContent="center" bg="$color4">
              <ImageOffIcon />
            </ImageContainer>
          )}
          <YStack>
            <H3>{itemName}</H3>
            <Text color="$color05">{category}</Text>
            {returningDate && <Text color="$color05">Returning on {returningDate}</Text>}
          </YStack>
          <Button
            disabled={borrowed}
            onPress={handleBorrowingProcess}
            icon={borrowed ? <BanIcon /> : <SmilePlusIcon />}
          >
            {borrowed ? 'Unavailable' : 'I want to take it'}
          </Button>
        </Card.Header>
      </Card>
    </ScrollView>
  )
}

const ItemImg = styled(Image, {
  br: '$true',
  h: '100%',
  w: '100%',
})

const ImageContainer = styled(View, {
  br: '$true',
  h: 200,
  w: '100%',
})

const ImageOffIcon = styled(ImageOffIc, {
  color: '$color',
})

export default CategoryItemPage
