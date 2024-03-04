import React from 'react'
import { Image } from 'expo-image'
import { router, useLocalSearchParams } from 'expo-router'
import { ImageOffIcon as ImageOffIc, SmilePlusIcon } from 'lucide-react-native'
import { Button, Card, H3, styled, Text, View, YStack } from 'tamagui'

const CategoryItemPage = () => {
  const { itemName, category, imgUrl } = useLocalSearchParams()
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
    <Card m="$2" bordered>
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
        </YStack>
        <Button width="100%" onPress={handleBorrowingProcess} icon={<SmilePlusIcon />}>
          I want to take it
        </Button>
      </Card.Header>
    </Card>
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
