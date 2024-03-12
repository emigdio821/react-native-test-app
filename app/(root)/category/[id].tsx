import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import type { CategoryItem } from '@/types'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
  View,
  type NativeSyntheticEvent,
  type TextInputFocusEventData,
} from 'react-native'

import { formatDate } from '@/lib/utils'
import { useCategoryById } from '@/hooks/use-category-byid'
import { Text } from '@/components/ui/text'
import { Small } from '@/components/ui/typography'
import ErrorCard from '@/components/error-card'
import { ChevronRightIcon } from '@/components/icons'
import { Spinner } from '@/components/spinner'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type CategoryParams = {
  id: string
  category: string
}

export default function CategoryPage() {
  const navigation = useNavigation()
  const { id, category } = useLocalSearchParams<CategoryParams>()
  const { data, error, refetch, isLoading } = useCategoryById(id)
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

  const handleTextFilter = useCallback(
    (value: string) => {
      setFilters({ ...filters, byName: value, hasFilter: !!value })
    },
    [filters],
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: category,
      headerSearchBarOptions: {
        autoFocus: false,
        placeholder: 'Search',
        onChangeText: (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
          const inputVal = e.nativeEvent.text
          handleTextFilter(inputVal)
        },
      },
    })
  }, [navigation, category, filters, handleTextFilter])

  useEffect(() => {
    handleFilters()
  }, [handleFilters])

  if (isLoading) {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Spinner className="m-2" />
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
        <ErrorCard msg="No items found for this category" />
      </ScrollView>
    )
  }

  const categories = filteredItems.length > 0 ? filteredItems : data.items

  return (
    <FlatList
      data={categories}
      contentInsetAdjustmentBehavior="automatic"
      keyExtractor={(item) => `${item.id}-${item.imgUrl}`}
      renderItem={({ item }) => (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            router.navigate({
              pathname: '/category/item/[id]',
              params: {
                category: item.category,
                id: item.id,
                imgUrl: item.imgUrl,
                itemName: item.name,
                isBorrowed: item.isBorrowed,
                returnDate: item.returnDate,
              },
            })
          }}
        >
          <View className="flex-row items-center justify-between bg-card px-3 py-3">
            <View>
              <Text className="font-semibold">{item.name}</Text>
              {item.isBorrowed ? (
                <View className="gap-1 opacity-80">
                  <Small>Unavailable</Small>
                  {item.returnDate && (
                    <Small>Returning on {formatDate(new Date(item.returnDate))}</Small>
                  )}
                </View>
              ) : (
                <Small>Available</Small>
              )}
            </View>
            <ChevronRightIcon size={16} className="text-foreground" />
          </View>
        </TouchableOpacity>
      )}
    />
  )
}
