import { registerSheet, type SheetDefinition } from 'react-native-actions-sheet'

import { CategoryFiltersSheet } from './category-filters'

registerSheet('category-filters-sheet', CategoryFiltersSheet)

declare module 'react-native-actions-sheet' {
  interface Sheets {
    'category-filters-sheet': SheetDefinition
  }
}

export {}
