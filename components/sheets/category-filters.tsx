import React, { useRef, useState } from 'react'
import type { CategoryFilters } from '@/types'
import { StyleSheet, useColorScheme, View, type TextInput } from 'react-native'
import ActionSheet from 'react-native-actions-sheet'

import { NAV_THEME } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { Toggle } from '@/components/ui/toggle'
import { H4 } from '@/components/ui/typography'
import { ArrowDownAZIcon, FilterXIcon } from '@/components/icons'

interface CategoryFiltersProps {
  payload: {
    filters: CategoryFilters
    setFilters: (filters: CategoryFilters) => void
  }
  sheetId: string
}

export function CategoryFiltersSheet(props: CategoryFiltersProps) {
  const colorScheme = useColorScheme()
  const byNameRef = useRef<TextInput>(null)
  const filters2 = props.payload.filters
  const setFiltersCallback = props.payload.setFilters
  const { asc, byStatus, byName } = filters2
  const sheetStyles = colorScheme === 'dark' ? styles.sheetDark : styles.sheet
  const [filters, setFilters] = useState<CategoryFilters>({
    byName,
    byStatus,
    asc,
  })

  function handleResetFilters() {
    const initalFilters: CategoryFilters = {
      asc: false,
      byName: '',
      byStatus: '',
    }
    setFilters(initalFilters)
    byNameRef.current?.clear()
    setFiltersCallback(initalFilters)
  }

  return (
    <ActionSheet gestureEnabled containerStyle={sheetStyles}>
      <View className="gap-2 p-6">
        <H4>Filter by</H4>
        <View className="flex-row flex-wrap gap-2">
          <Toggle
            variant="outline"
            pressed={filters.byStatus === 'available'}
            onPressedChange={(val) => {
              setFilters({ ...filters, byStatus: val ? 'available' : '' })
            }}
            aria-label="Toggle available"
          >
            <Text>Available</Text>
          </Toggle>
          <Toggle
            variant="outline"
            pressed={filters.byStatus === 'unavailable'}
            onPressedChange={(val) => {
              setFilters({ ...filters, byStatus: val ? 'unavailable' : '' })
            }}
            aria-label="Toggle unavailable"
          >
            <Text>Unavailable</Text>
          </Toggle>
          <Toggle
            variant="outline"
            pressed={filters.asc}
            onPressedChange={(val) => {
              setFilters({ ...filters, asc: val })
            }}
            aria-label="Toggle unavailable"
          >
            <ArrowDownAZIcon size={16} className="text-foreground" />
          </Toggle>
        </View>
        <Input
          ref={byNameRef}
          placeholder="Name"
          onChangeText={(val) => {
            setFilters({ ...filters, byName: val })
          }}
        />
        <View className="flex-row gap-2">
          <Button
            className="grow"
            onPress={() => {
              setFiltersCallback(filters)
            }}
          >
            <Text>Apply filters</Text>
          </Button>
          <Button onPress={handleResetFilters}>
            <FilterXIcon size={16} className="text-primary-foreground" />
          </Button>
        </View>
      </View>
    </ActionSheet>
  )
}

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: NAV_THEME.light.card,
  },
  sheetDark: {
    backgroundColor: NAV_THEME.dark.card,
  },
})
