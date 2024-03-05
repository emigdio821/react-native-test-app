import React, { useEffect, useState } from 'react'
import { CATEGORY_DATA, type CategoryItem } from '@/apiMock/categories'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import { ChevronRight, RabbitIcon as RabbitIc, RotateCwIcon, SearchIcon } from 'lucide-react-native'
import { ActivityIndicator } from 'react-native'
import {
  Button,
  Card,
  Input,
  ListItem,
  Paragraph,
  ScrollView,
  styled,
  Text,
  View,
  XStack,
  YGroup,
} from 'tamagui'

import { formatDate } from '@/lib/utils'

interface NotFoundCardProps {
  message?: string
  callback?: () => void
  withAction?: boolean
  withSpacing?: boolean
}

const NotFoundCard = ({
  callback,
  withSpacing = false,
  withAction = false,
  message = 'No items found for this category',
}: NotFoundCardProps) => {
  return (
    <Card bordered m={withSpacing ? '$2' : 'unset'}>
      <Card.Header alignItems="center">
        <RabbitIcon size={60} />
        <Paragraph>{message}</Paragraph>
      </Card.Header>
      {withAction && (
        <Card.Footer p="$2">
          <Button w="100%" icon={<RotateCwIcon />} onPress={callback}>
            Reload
          </Button>
        </Card.Footer>
      )}
      <Card.Background />
    </Card>
  )
}

const CategoryPage = () => {
  const [isLoading, setLoading] = useState(true)
  const [categoryItems, setCategoryItems] = useState<CategoryItem[]>([])
  const [filteredItems, setFilteredItems] = useState<CategoryItem[]>([])
  const { id, category } = useLocalSearchParams()
  const navigation = useNavigation()

  const handleFilterItem = (value: string) => {
    const filtered = categoryItems.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase()),
    )

    setFilteredItems(filtered)
  }

  useEffect(() => {
    async function getItems() {
      try {
        await new Promise((resolve) => {
          setTimeout(() => {
            const data = CATEGORY_DATA.find((category) => category.id === parseInt(id as string))
            const items = data?.items ?? []

            setCategoryItems(items)
            setFilteredItems(items)
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
    return <NotFoundCard withSpacing />
  }

  return (
    <View p="$2" gap="$2" flex={1}>
      <XStack w="100%" alignItems="center" justifyContent="flex-end">
        <Input
          flexGrow={1}
          placeholder="Search"
          paddingEnd="$8"
          onChangeText={(value) => {
            handleFilterItem(value)
          }}
        />
        <XStack paddingEnd="$3" position="absolute">
          <SearchIcon />
        </XStack>
      </XStack>
      {filteredItems.length > 0 ? (
        <View bw={1} bc="$borderColor" br="$4" ov="hidden" mb="$12">
          <ScrollView>
            <YGroup>
              {filteredItems.map((item) => (
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
                    title={item.name}
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
          </ScrollView>
        </View>
      ) : (
        <NotFoundCard message="No items found" />
      )}
    </View>
  )
}

const RabbitIcon = styled(RabbitIc, {
  name: 'RabbitIcon',
  color: '$color',
})

export default CategoryPage
