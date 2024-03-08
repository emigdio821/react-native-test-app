import React from 'react'
import { Image } from 'expo-image'
import { useLocalSearchParams } from 'expo-router'
import { ImageOffIcon, TriangleAlertIcon } from 'lucide-react-native'
import { Button, Card, H3, ScrollView, styled, Text, View, YStack } from 'tamagui'

import { formatDate } from '@/lib/utils'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type MyItemsParams = {
  id: string
  category: string
  imgUrl: string
  itemName: string
  returnDate: string
  borrowedDate: string
}

const MyItemPage = () => {
  const { category, imgUrl, itemName, returnDate, borrowedDate } =
    useLocalSearchParams<MyItemsParams>()
  const rDate = new Date(returnDate)
  const bDate = new Date(borrowedDate)
  const _returnDate = returnDate ? formatDate(rDate) : null
  const _borrowedDate = borrowedDate ? formatDate(bDate) : null

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
              <StyledImageOffIcon />
            </ImageContainer>
          )}
          <YStack>
            <H3>{itemName}</H3>
            <Text color="$color05" mb="$2">
              {category}
            </Text>
            <Text>
              Borrowed on <Text fontWeight="800">{_borrowedDate}</Text>
            </Text>
            <Text>
              Expected return on <Text fontWeight="800">{_returnDate}</Text>
            </Text>
          </YStack>
          <Button>Return it</Button>
          <Button icon={<TriangleAlertIcon />}>Report a problem</Button>
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

const StyledImageOffIcon = styled(ImageOffIcon, {
  name: 'StyledImageOffIcon',
  color: '$color',
})

export default MyItemPage
