import React, { useEffect, useState } from 'react'
import { Image } from 'expo-image'
import { ActivityIndicator, Dimensions, RefreshControl, StyleSheet } from 'react-native'
import { ScrollView, Text, View, XStack } from 'tamagui'

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
    const EP_URL = `https://picsum.photos/v2/list?page=${page}&limit=100`
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
      <View flex={1} pt={16}>
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
      <XStack flex={1} gap={gap} flexWrap="wrap">
        {images.map((img) => (
          <View key={img.id} w={imageSize} h={imageSize}>
            <Image
              transition={300}
              contentFit="cover"
              style={styles.image}
              source={img.download_url}
            />
          </View>
        ))}
      </XStack>
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
