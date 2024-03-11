import React from 'react'
import { Image } from 'expo-image'
import { useLocalSearchParams } from 'expo-router'
import { ScrollView, StyleSheet, View } from 'react-native'

import { formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import { H4, Muted } from '@/components/ui/typography'
import { ImageOffIcon } from '@/components/icons'

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
            {_borrowedDate && (
              <Text>
                Borrowed on <Text className="font-semibold">{_borrowedDate}</Text>
              </Text>
            )}
            {_returnDate && (
              <Text>
                Expected return on <Text className="font-semibold">{_returnDate}</Text>
              </Text>
            )}
          </View>
        </CardHeader>
        <CardFooter>
          <Button className="grow">
            <Text>Report a problem</Text>
          </Button>
        </CardFooter>
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

export default MyItemPage
