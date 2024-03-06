import React from 'react'
import { Link } from 'expo-router'
import { WrenchIcon } from 'lucide-react-native'
import { Button, View, YStack } from 'tamagui'

import CategoriesCarousel from '@/components/categories-carousel'
import FeaturedItemsCarousel from '@/components/featured-items-carousel'

export default function Home() {
  return (
    <View flex={1} bg="$background" justifyContent="space-between" pb="$2">
      <View gap="$2">
        <YStack gap="$2">
          <CategoriesCarousel />
          <FeaturedItemsCarousel />
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
