import React from 'react'
import { Image } from 'expo-image'
import { router, useLocalSearchParams } from 'expo-router'
import { ScrollView, StyleSheet, View } from 'react-native'

import { formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import { H4, Muted } from '@/components/ui/typography'
import { BanIcon, ImageOffIcon } from '@/components/icons'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type CategoryItemParams = {
  id: string
  itemName: string
  imgUrl: string
  isBorrowed: string
  category: string
  returnDate: string
}

const CategoryItemPage = () => {
  const { itemName, category, imgUrl, isBorrowed, returnDate } =
    useLocalSearchParams<CategoryItemParams>()
  const borrowed = isBorrowed === 'true'
  const date = new Date(returnDate)
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
      <Card className="m-2">
        <CardHeader className="gap-2">
          {imgUrl ? (
            <View className="h-48 overflow-hidden rounded-lg">
              <Image source={imgUrl} transition={300} contentFit="cover" style={styles.image} />
            </View>
          ) : (
            <View className="h-48 items-center justify-center rounded-lg bg-muted px-4 py-10">
              <ImageOffIcon size={16} className="text-foreground" />
            </View>
          )}
          <View>
            <Muted>{category}</Muted>
            <H4>{itemName}</H4>
            {returningDate && (
              <Text>
                Returning on <Text className="font-semibold">{returningDate}</Text>
              </Text>
            )}
          </View>
          <Button
            disabled={borrowed}
            onPress={handleBorrowingProcess}
            className="flex-row items-center"
          >
            <Text>{borrowed ? 'Unavailable' : 'I want to take it'}</Text>
            {borrowed && <BanIcon className="ml-2 text-primary-foreground" size={16} />}
          </Button>
        </CardHeader>
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
})

export default CategoryItemPage
