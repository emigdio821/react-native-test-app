import type { CategoryItem } from '@/types'
import { useQuery } from '@tanstack/react-query'
import axios, { isAxiosError } from 'axios'
import * as SecureStore from 'expo-secure-store'

import { ACCESS_TKN, API_URL } from '@/lib/constants'

const EP = `${API_URL}/featured-items`
const MAX_ITEMS = 5

export function useFeaturedItems(returnAll?: boolean) {
  const getFeaturedItems = async () => {
    try {
      const AT = await SecureStore.getItemAsync(ACCESS_TKN)
      const res = await axios.get<CategoryItem[]>(EP, {
        headers: {
          Authorization: `Bearer ${AT}`,
        },
      })

      if (returnAll) return res.data

      const data: CategoryItem[] = []
      res.data.forEach((item) => {
        if (data.length < MAX_ITEMS) {
          data.push(item)
        }
      })

      return data
    } catch (err) {
      let errorMsg = 'Something went wrong while fetching featured items'
      if (isAxiosError(err)) {
        errorMsg = err.message
      }
      throw new Error(errorMsg)
    }
  }

  return useQuery({ queryKey: ['featured-items', returnAll], queryFn: getFeaturedItems })
}
