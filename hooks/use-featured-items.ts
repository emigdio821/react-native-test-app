import type { CategoryItem } from '@/types'
import { useQuery } from '@tanstack/react-query'
import axios, { isAxiosError } from 'axios'

const EP = 'http://192.168.0.103:3000/featured-items'

export const useFeaturedItems = () => {
  const getFeaturedItems = async () => {
    try {
      const res = await axios.get<CategoryItem[]>(EP)
      return res.data
    } catch (err) {
      let defaultErr = 'Something went wrong while fetching featured items'
      if (isAxiosError(err)) {
        defaultErr = err.message
      }
      throw new Error(defaultErr)
    }
  }

  return useQuery({ queryKey: ['featured-items'], queryFn: getFeaturedItems })
}
