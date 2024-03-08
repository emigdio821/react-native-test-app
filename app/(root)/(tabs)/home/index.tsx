import React from 'react'
import { Link } from 'expo-router'
import { QrCodeIcon } from 'lucide-react-native'
import { Button, ScrollView, View, YStack } from 'tamagui'

import CategoriesCarousel from '@/components/categories-carousel'
import FeaturedItemsCarousel from '@/components/featured-items-carousel'

export default function Home() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View gap="$2" justifyContent="space-between">
        <YStack gap="$2">
          <CategoriesCarousel />
          <FeaturedItemsCarousel />
        </YStack>
        <Link href={'/test-view'} asChild>
          <Button mx="$2" icon={<QrCodeIcon />}>
            Scan QR code
          </Button>
        </Link>
      </View>
    </ScrollView>
  )
}
