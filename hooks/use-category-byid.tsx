import type { Category } from '@/types'
import { useQuery } from '@tanstack/react-query'
import axios, { isAxiosError } from 'axios'

const EP = 'http://192.168.0.103:3000/categories'

export const useCategoryById = (id: number | string) => {
  const getCategory = async () => {
    const ep = `${EP}/${id}`

    try {
      const res = await axios.get<Category>(ep)
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
