import { API_URL } from '@/lib/constants'
import { ACCESS_TKN } from '@/lib/constants'
import type { Category } from '@/types'
import { useQuery } from '@tanstack/react-query'
import axios, { isAxiosError } from 'axios'
import * as SecureStore from 'expo-secure-store'

const EP = `${API_URL}/categories`

export const useCategoryById = (id: number | string) => {
  const getCategory = async () => {
    const ep = `${EP}/${id}`

    try {
      const AT = await SecureStore.getItemAsync(ACCESS_TKN)
      const res = await axios.get<Category>(ep, {
        headers: {
          Authorization: `Bearer ${AT}`,
        },
      })
      return res.data
    } catch (err) {
      let errorMsg = 'Something went wrong while fetching categories'
      if (isAxiosError(err)) {
        errorMsg = err.message
      }
      throw new Error(errorMsg)
    }
  }

  return useQuery({ queryKey: ['category', id], queryFn: getCategory })
}
