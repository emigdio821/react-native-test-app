import type { Category } from '@/types'
import { useQuery } from '@tanstack/react-query'
import axios, { isAxiosError } from 'axios'

const EP = 'http://192.168.0.103:3000/categories'

export const useCategories = () => {
  const getCategories = async () => {
    try {
      const res = await axios.get<Category[]>(EP)
      return res.data
    } catch (err) {
      let defaultErr = 'Something went wrong while fetching categories'
      if (isAxiosError(err)) {
        defaultErr = err.message
      }
      throw new Error(defaultErr)
    }
  }

  return useQuery({ queryKey: ['categories'], queryFn: getCategories })
}
