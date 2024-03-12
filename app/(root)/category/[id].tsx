import React, { useCallback, useLayoutEffect, useState } from 'react'
import type { CategoryFilters } from '@/types'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import {
  FlatList,
  Platform,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native'
import { SheetManager } from 'react-native-actions-sheet'

import { NAV_THEME } from '@/lib/constants'
import { formatDate } from '@/lib/utils'
import { useCategoryById } from '@/hooks/use-category-byid'
import { Text } from '@/components/ui/text'
import { Small } from '@/components/ui/typography'
import ErrorCard from '@/components/error-card'
import { ChevronRightIcon, FilterIcon } from '@/components/icons'
import { Spinner } from '@/components/spinner'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type CategoryParams = {
  id: string
  category: string
}

export default function CategoryPage() {
  const navigation = useNavigation()
  const [filters, setFilters] = useState<CategoryFilters>({
    byName: '',
    byStatus: '',
    asc: false,
  })
  const { id, category } = useLocalSearchParams<CategoryParams>()
  const { data, error, refetch, isLoading } = useCategoryById({ id, filterFn: filterCategories })
  const colorScheme = useColorScheme()

  function filterCategories(category: typeof data) {
    if (!category) return category

    let filterData = category.items
    const byName = filters.byName
    const byStatus = filters.byStatus
    const byAsc = filters.asc

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

    if (byAsc) {
      const filterDataCopy = [...filterData]
      const filtered = filterDataCopy.sort((a, b) => {
        if (a.name > b.name) {
          return 1
        }
        if (a.name < b.name) {
          return -1
        }
        return 0
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
      setFilters({ ...filters, byName: value })
    },
    [filters],
  )

  useLayoutEffect(() => {
    const searchTextColor = colorScheme === 'dark' ? NAV_THEME.dark.text : NAV_THEME.light.text
    const headerIconColor =
      colorScheme === 'dark' ? NAV_THEME.dark.primary : NAV_THEME.light.primary

    navigation.setOptions({
      headerTitle: category,
      headerRight: () => (
        <TouchableOpacity
          // className="p-2"
          onPress={() => {
            void SheetManager.show('category-filters-sheet', {
              payload: {
                filters,
                setFilters,
              },
            })
          }}
        >
          <FilterIcon className="text-primary" size={16} />
        </TouchableOpacity>
      ),
      headerSearchBarOptions: {
        headerIconColor,
        autoFocus: false,
        placeholder: 'Search',
        hintTextColor: searchTextColor,
        shouldShowHintSearchIcon: false,
        textColor: Platform.OS === 'android' ? searchTextColor : undefined,
        onChangeText: (e: any) => {
          // TODO: fix types
          const inputVal = e.nativeEvent.text
          handleTextFilter(inputVal as string)
        },
      },
    })
  }, [category, colorScheme, filters, handleTextFilter, navigation])

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
