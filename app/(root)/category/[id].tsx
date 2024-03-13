import React, { useLayoutEffect, useState } from 'react'
import type { CategoryFilters, CategoryItem } from '@/types'
import { Image } from 'expo-image'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { SheetManager } from 'react-native-actions-sheet'
import ContextMenu from 'react-native-context-menu-view'

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

  function handleDetailsPress(item: CategoryItem) {
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
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: category,
      headerRight: () => (
        <TouchableOpacity
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
    })
  }, [category, filters, navigation])

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
            <ContextMenu
              actions={[
                {
                  title: 'Borrow',
                  disabled: item.isBorrowed,
                },
                {
                  title: 'Details',
                },
              ]}
              onPress={(e) => {
                if (e.nativeEvent.index === 0) {
                  router.navigate({
                    pathname: '/(modals)/borrow-form',
                    params: {
                      category,
                      itemName: item.name,
                      imgUrl: item.imgUrl,
                    },
                  })
                }
                if (e.nativeEvent.index === 1) {
                  handleDetailsPress(item)
                }
              }}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                delayLongPress={250}
                onLongPress={() => {}}
                onPress={() => {
                  handleDetailsPress(item)
                }}
              >
                <View className="flex-row items-center justify-between bg-card px-3 py-3">
                  <View className="flex-row items-center gap-2">
                    <View className="h-12 w-12 overflow-hidden rounded-lg">
                      <Image
                        transition={300}
                        contentFit="cover"
                        source={item.imgUrl}
                        style={styles.image}
                      />
                    </View>
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
                  </View>
                  <ChevronRightIcon size={16} className="text-foreground" />
                </View>
              </TouchableOpacity>
            </ContextMenu>
          )}
        />
      ) : (
        <ErrorCard msg="No items found" />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
})
