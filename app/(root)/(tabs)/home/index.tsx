import React from 'react'
import { Link } from 'expo-router'
import { ScrollView, View } from 'react-native'

import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { CategoriesCarousel } from '@/components/categories-carousel'
import { FeaturedItemsCarousel } from '@/components/featured-items-carousel'
import { QrCodeIcon } from '@/components/icons'

export default function Home() {
  return (
    <View className="flex-1">
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View className="my-2 gap-4">
          <CategoriesCarousel />
          <FeaturedItemsCarousel />
        </View>
      </ScrollView>

      <Link href={'/qr-scanner'} asChild>
        <Button className="mx-2 mb-2 flex-row">
          <Text>Scan QR code</Text>
          <QrCodeIcon className="ml-2 text-primary-foreground" size={16} />
        </Button>
      </Link>
    </View>
  )
}
