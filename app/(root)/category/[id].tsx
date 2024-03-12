import React, { useCallback, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import {
  FlatList,
  Platform,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native'

import { NAV_THEME } from '@/lib/constants'
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
  const [filters, setFilters] = useState({
    hasFilter: false,
    byName: '',
    byStatus: '',
    asc: false,
  })
  const { id, category } = useLocalSearchParams<CategoryParams>()
  const { data, error, refetch, isLoading } = useCategoryById({ id, filterFn: filterCategories })
  const colorScheme = useColorScheme()
  const searchTextColor = colorScheme === 'dark' ? NAV_THEME.dark.text : NAV_THEME.light.text
  const headerIconColor = colorScheme === 'dark' ? NAV_THEME.dark.primary : NAV_THEME.light.primary

  function filterCategories(category: typeof data) {
    if (!category) return category

    let filterData = category.items
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

    return {
      ...category,
      items: filterData,
    }
  }

  const handleTextFilter = useCallback(
    (value: string) => {
      setFilters({ ...filters, byName: value, hasFilter: !!value })
    },
    [filters],
  )

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

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: category,
          headerSearchBarOptions: {
            headerIconColor,
            autoFocus: false,
            placeholder: 'Search',
            hintTextColor: searchTextColor,
            shouldShowHintSearchIcon: false,
            textColor: Platform.OS === 'android' ? searchTextColor : undefined,
            onChangeText: (e) => {
              const inputVal = e.nativeEvent.text
              handleTextFilter(inputVal)
            },
          },
        }}
      />
      {data.items.length > 0 ? (
        <FlatList
          data={data.items}
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
      ) : (
        <ErrorCard msg="No items found" />
      )}
    </>
  )
}
