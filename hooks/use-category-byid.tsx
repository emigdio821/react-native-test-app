import type { Category } from '@/types'
import { useQuery } from '@tanstack/react-query'
import axios, { isAxiosError } from 'axios'
import * as SecureStore from 'expo-secure-store'

import { ACCESS_TKN, API_URL } from '@/lib/constants'

interface CategoryByIdProps {
  id: number | string
  filterFn?: (data: Category | undefined) => typeof data
}

const EP = `${API_URL}/categories`

export const useCategoryById = ({ id, filterFn }: CategoryByIdProps) => {
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

  return useQuery({ queryKey: ['category', id], queryFn: getCategory, select: filterFn })
}
