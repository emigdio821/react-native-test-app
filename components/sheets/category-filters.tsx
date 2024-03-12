import React, { useEffect, useState } from 'react'
import type { CategoryFilters } from '@/types'
import { StyleSheet, useColorScheme, View } from 'react-native'
import ActionSheet from 'react-native-actions-sheet'

import { NAV_THEME } from '@/lib/constants'
import { Text } from '@/components/ui/text'
import { Toggle } from '@/components/ui/toggle'
import { H4 } from '@/components/ui/typography'
import { ArrowDownAZIcon } from '@/components/icons'

interface CategoryFiltersProps {
  payload: {
    filters: CategoryFilters
    setFilters: (filters: CategoryFilters) => void
  }
  sheetId: string
}

export function CategoryFiltersSheet(props: CategoryFiltersProps) {
  const colorScheme = useColorScheme()
  const filters2 = props.payload.filters
  const setFiltersCallback = props.payload.setFilters
  const { asc, byStatus, byName } = filters2
  const sheetStyles = colorScheme === 'dark' ? styles.sheetDark : styles.sheet
  const [filters, setFilters] = useState<CategoryFilters>({
    byName,
    byStatus,
    asc,
  })

  useEffect(() => {
    setFiltersCallback(filters)
  }, [filters, setFiltersCallback])

  return (
    <ActionSheet gestureEnabled containerStyle={sheetStyles}>
      <View className="gap-2 p-6">
        <H4>Filter by</H4>
        <View className="flex-row flex-wrap gap-2">
          <Toggle
            pressed={filters.byStatus === 'available'}
            onPressedChange={(val) => {
              setFilters({ ...filters, byStatus: val ? 'available' : '' })
            }}
            aria-label="Toggle available"
          >
            <Text>Available</Text>
          </Toggle>
          <Toggle
            pressed={filters.byStatus === 'unavailable'}
            onPressedChange={(val) => {
              setFilters({ ...filters, byStatus: val ? 'unavailable' : '' })
            }}
            aria-label="Toggle unavailable"
          >
            <Text>Unavailable</Text>
          </Toggle>
          <Toggle
            pressed={filters.asc}
            onPressedChange={(val) => {
              setFilters({ ...filters, asc: val })
            }}
            aria-label="Toggle unavailable"
          >
            <ArrowDownAZIcon size={16} className="text-foreground" />
          </Toggle>
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
