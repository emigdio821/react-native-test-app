import { ACCESS_TKN } from '@/constants/auth'
import type { CategoryItem } from '@/types'
import { useQuery } from '@tanstack/react-query'
import axios, { isAxiosError } from 'axios'
import * as SecureStore from 'expo-secure-store'

const EP = 'http://localhost:3000/featured-items'

export const useFeaturedItems = () => {
  const getFeaturedItems = async () => {
    try {
      const AT = await SecureStore.getItemAsync(ACCESS_TKN)
      const res = await axios.get<CategoryItem[]>(EP, {
        headers: {
          Authorization: `Bearer ${AT}`,
        },
      })
      return res.data
    } catch (err) {
      let errorMsg = 'Something went wrong while fetching featured items'
      if (isAxiosError(err)) {
        errorMsg = err.message
      }
      throw new Error(errorMsg)
    }
  }

  return useQuery({ queryKey: ['featured-items'], queryFn: getFeaturedItems })
}
