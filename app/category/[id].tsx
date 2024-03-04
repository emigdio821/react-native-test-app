import React, { useEffect, useState } from 'react'
import { CATEGORY_DATA, type CategoryItem } from '@/apiMock/categories'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import { ChevronRight, RabbitIcon as RabbitIc, RotateCwIcon } from 'lucide-react-native'
import { ActivityIndicator } from 'react-native'
import {
  Button,
  Card,
  H2,
  ListItem,
  Paragraph,
  ScrollView,
  styled,
  Text,
  View,
  YGroup,
} from 'tamagui'

import { formatDate } from '@/lib/utils'

const CategoryPage = () => {
  const [isLoading, setLoading] = useState(true)
  const [categoryItems, setCategoryItems] = useState<CategoryItem[]>([])
  const { id, category } = useLocalSearchParams()
  const navigation = useNavigation()

  useEffect(() => {
    async function getItems() {
      try {
        await new Promise((resolve) => {
          setTimeout(() => {
            const data = CATEGORY_DATA.find((category) => category.id === parseInt(id as string))
            const items = data?.items ?? []

            setCategoryItems(items)
            resolve('cool')
          }, 0)
        })
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    navigation.setOptions({ headerTitle: category ?? '' })
    void getItems()
  }, [category, id, navigation])

  if (isLoading) {
    return (
      <View flex={1} pt={16}>
        <ActivityIndicator />
      </View>
    )
  }

  if (categoryItems.length === 0) {
    return (
      <Card m="$2" bordered>
        <Card.Header alignItems="center">
          <RabbitIcon size={60} />
          <Paragraph>No items found for this category</Paragraph>
        </Card.Header>
        <Card.Footer p="$2">
          <Button w="100%" icon={<RotateCwIcon />}>
            Refresh
          </Button>
        </Card.Footer>
        <Card.Background />
      </Card>
    )
  }

  return (
    <ScrollView>
      <View gap="$2">
        <H2 px="$2">Items</H2>
        <YGroup mx="$2" mb="$6">
          {categoryItems.map((item) => (
            <YGroup.Item key={item.id}>
              <ListItem
                onPress={() => {
                  router.navigate({
                    pathname: '/category/item/[id]',
                    params: {
                      category,
                      id: item.id,
                      imgUrl: item.imgUrl,
                      itemName: item.name,
                    },
                  })
                }}
                pressTheme
                title={
                  <Text fontSize={14} fontWeight="800">
                    {item.name}
                  </Text>
                }
                disabled={item.isBorrowed}
                iconAfter={<ChevronRight />}
                subTitle={
                  <>
                    {item.isBorrowed ? (
                      <>
                        <Text fontSize={12} color="$color05">
                          Unavailable
                        </Text>
                        {item.returnDate != null && (
                          <Text fontSize={12} color="$color05">
                            Returning on {formatDate(new Date(item.returnDate * 1000))}
                          </Text>
                        )}
                      </>
                    ) : (
                      <Text fontSize={12} color="$color05">
                        Available
                      </Text>
                    )}
                  </>
                }
              />
            </YGroup.Item>
          ))}
        </YGroup>
      </View>
    </ScrollView>
  )
}

const RabbitIcon = styled(RabbitIc, {
  name: 'RabbitIcon',
  color: '$color',
})

export default CategoryPage
