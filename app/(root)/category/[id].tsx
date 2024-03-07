import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import type { CategoryItem } from '@/types'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import { ArrowDownAZ, ArrowUpAZ, ChevronRight, GhostIcon, RotateCwIcon } from 'lucide-react-native'
import {
  ActivityIndicator,
  type NativeSyntheticEvent,
  type TextInputFocusEventData,
} from 'react-native'
import {
  Button,
  Card,
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
    <Card m={withSpacing ? '$2' : 'unset'}>
      <Card.Header alignItems="center">
        <StyledGhostIcon size={32} />
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
  const { data, error, refetch, isLoading } = useCategoryById(id as string)
  const [filteredItems, setFilteredItems] = useState<CategoryItem[]>([])
  const [filters, setFilters] = useState({
    hasFilter: false,
    byName: '',
    byStatus: '',
    asc: false,
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
    if (data) {
      setFilteredItems(data.items)
    }
  }, [data])

  useEffect(() => {
    handleFilters()
  }, [handleFilters])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: (category as string) ?? '',
      headerSearchBarOptions: {
        autoFocus: false,
        placeholder: 'Search',
        onChangeText: (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
          const inputVal = e.nativeEvent.text
          setFilters({ ...filters, byName: inputVal, hasFilter: !!inputVal })
        },
      },
    })
  }, [navigation, category, filters])

  if (isLoading) {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View m="$2">
          <ActivityIndicator />
        </View>
      </ScrollView>
    )
  }

  if (error) {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <ErrorCard
          msg={error.message}
          action={() => {
            void refetch()
          }}
        />
      </ScrollView>
    )
  }

  if (!data) {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <NotFoundCard withSpacing />
      </ScrollView>
    )
  }

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View m="$2" gap="$2">
        <XStack justifyContent="flex-end" gap="$2">
          <ToggleGroup
            type="single"
            onValueChange={(value) => {
              setFilters({ ...filters, byStatus: value, hasFilter: !!value })
            }}
          >
            <ToggleGroup.Item value="available">
              <Text>Available</Text>
            </ToggleGroup.Item>
            <ToggleGroup.Item value="unavailable">
              <Text>Unavailable</Text>
            </ToggleGroup.Item>
          </ToggleGroup>
          <Button
            icon={filters.asc ? <ArrowUpAZ size={18} /> : <ArrowDownAZ size={18} />}
            onPress={() => {
              setFilters((prev) => ({ ...filters, asc: !prev.asc }))
            }}
          />
        </XStack>

        {filteredItems.length > 0 ? (
          <YGroup mb="$2">
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
        ) : (
          <>
            {data && (
              <View m="$2">
                <ActivityIndicator />
              </View>
            )}
            {filters.hasFilter && <NotFoundCard message="No items found" />}
          </>
        )}
      </View>
    </ScrollView>
  )
}

const StyledGhostIcon = styled(GhostIcon, {
  name: 'StyledGhostIcon',
  color: '$accentColor',
})

export default CategoryPage
