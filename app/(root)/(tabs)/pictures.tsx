import React, { useEffect, useState } from 'react'
import { Image } from 'expo-image'
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'

import { Text } from '@/components/ui/text'

interface Images {
  id: string
  author: string
  width: number
  height: number
  url: string
  download_url: string
}

const PicturesTab = () => {
  const gap = 2
  const numColumns = 4
  const [isLoading, setLoading] = useState(true)
  const [images, setImages] = useState<Images[]>([])
  const screenWidth = Dimensions.get('window').width
  const availableSpace = screenWidth - (numColumns - 1) * gap
  const imageSize = availableSpace / numColumns

  const getImages = async () => {
    const page = Math.floor(Math.random() * 10) + 1
    const EP_URL = `https://picsum.photos/v2/list?page=${page}&limit=20`
    try {
      const response = await fetch(EP_URL)
      const images = await response.json()
      setImages(images as Images[])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void getImages()
  }, [])

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    )
  }

  if (images.length === 0) {
    return <Text>Images not found</Text>
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => {
            void getImages()
          }}
        />
      }
    >
      <View className="flex-1 flex-wrap gap-2">
        {images.map((img) => (
          <View key={img.id} style={{ width: imageSize, height: imageSize }}>
            <Image
              transition={300}
              contentFit="cover"
              style={styles.image}
              source={img.download_url}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
})

export default PicturesTab
