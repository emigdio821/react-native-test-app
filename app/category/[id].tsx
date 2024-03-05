import React, { useCallback, useEffect, useState } from 'react'
import type { CategoryItem } from '@/types'
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
  ToggleGroup,
  View,
  XStack,
  YGroup,
} from 'tamagui'

import { formatDate } from '@/lib/utils'
import { useCategoryById } from '@/hooks/use-category-byid'
import ErrorCard from '@/components/error-card'

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
  const navigation = useNavigation()
  const { id, category } = useLocalSearchParams()
  const { data, error, isLoading, refetch } = useCategoryById(id as string)
  const [filteredItems, setFilteredItems] = useState<CategoryItem[]>([])
  const [filters, setFilters] = useState({
    byName: '',
    byStatus: '',
  })

  const handleFilters = useCallback(() => {
    if (data) {
      let filterData = data.items
      const byName = filters.byName
      const byStatus = filters.byStatus

      if (byName) {
        const filtered = filterData.filter((item) =>
          item.name.toLowerCase().includes(byName.toLowerCase()),
        )
        filterData = filtered
      }

      if (byStatus) {
        const filtered = filterData.filter((item) => {
          switch (byStatus) {
            case 'available':
              return !item.isBorrowed
            case 'unavailable':
              return item.isBorrowed
            default:
              return true
          }
        })
        filterData = filtered
      }

      setFilteredItems(filterData)
    }
  }, [data, filters.byName, filters.byStatus])

  useEffect(() => {
    navigation.setOptions({ headerTitle: category ?? '' })
  }, [category, navigation])

  useEffect(() => {
    if (data) {
      setFilteredItems(data.items)
    }
  }, [data])

  useEffect(() => {
    handleFilters()
  }, [handleFilters])

  if (isLoading) {
    return (
      <View flex={1} pt={16}>
        <ActivityIndicator />
      </View>
    )
  }

  if (error) {
    return (
      <ErrorCard
        msg={error.message}
        action={() => {
          void refetch()
        }}
      />
    )
  }

  if (!data) {
    return <NotFoundCard withSpacing />
  }

  return (
    <View px="$2" pt="$2" gap="$2" flex={1}>
      <XStack w="100%" alignItems="center" justifyContent="flex-end">
        <Input
          flexGrow={1}
          placeholder="Search"
          paddingEnd="$8"
          onChangeText={(value) => {
            setFilters({ ...filters, byName: value })
          }}
        />
        <XStack paddingEnd="$3" position="absolute">
          <SearchIcon />
        </XStack>
      </XStack>

      <ToggleGroup
        size="$2"
        type="single"
        alignSelf="flex-end"
        onValueChange={(value) => {
          setFilters({ ...filters, byStatus: value })
        }}
      >
        <ToggleGroup.Item value="available">
          <Text fontSize="$1">Available</Text>
        </ToggleGroup.Item>
        <ToggleGroup.Item value="unavailable">
          <Text fontSize="$1">Unavailable</Text>
        </ToggleGroup.Item>
      </ToggleGroup>

      {filteredItems.length > 0 ? (
        <ScrollView>
          <YGroup mb="$6">
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
                              Returning on {formatDate(new Date(item.returnDate))}
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
