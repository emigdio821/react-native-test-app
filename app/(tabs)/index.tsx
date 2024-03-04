import React from 'react'
import {
  CATEGORIES,
  MOST_BORROWED,
  type Category,
  type MostBorrowedItem,
} from '@/apiMock/categories'
import { Link, router } from 'expo-router'
import { WrenchIcon } from 'lucide-react-native'
import { Button, H2, View, YStack } from 'tamagui'

import ImageCarousel, { type ImageCareouselItem } from '@/components/image-carousel'

export default function Home() {
  const handleCategoryNavigate = (item: ImageCareouselItem<Category>) => {
    router.navigate({
      pathname: '/category/[id]',
      params: {
        id: item.id,
        category: item.name,
      },
    })
  }

  const handleItemNavigate = (item: ImageCareouselItem<MostBorrowedItem>) => {
    router.navigate({
      pathname: '/category/item/[id]',
      params: {
        category: item.category,
        id: item.id,
        imgUrl: item.imgUrl,
        itemName: item.name,
      },
    })
  }

  return (
    <View flex={1} bg="$background" justifyContent="space-between" pb="$2">
      <View gap="$2">
        <YStack gap="$2">
          <H2 px="$2">Categories</H2>
          <ImageCarousel onPress={handleCategoryNavigate} data={CATEGORIES} />

          <H2 px="$2">Most borrowed</H2>
          <ImageCarousel onPress={handleItemNavigate} titleSize={20} data={MOST_BORROWED} />
        </YStack>
      </View>

      <Link href={'/test-view'} asChild>
        <Button mx="$2" icon={<WrenchIcon />}>
          Manage items
        </Button>
      </Link>
    </View>
  )
}
