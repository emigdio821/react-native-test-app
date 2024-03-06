import { API_URL } from '@/constants/api'
import { ACCESS_TKN } from '@/constants/auth'
import type { Category } from '@/types'
import { useQuery } from '@tanstack/react-query'
import axios, { isAxiosError } from 'axios'
import * as SecureStore from 'expo-secure-store'

const EP = `${API_URL}/categories`

export const useCategories = () => {
  const getCategories = async () => {
    try {
      const AT = await SecureStore.getItemAsync(ACCESS_TKN)
      const res = await axios.get<Category[]>(EP, {
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

  return useQuery({ queryKey: ['categories'], queryFn: getCategories })
}
