import type { MyItems } from '@/types'
import { useQuery } from '@tanstack/react-query'
import axios, { isAxiosError } from 'axios'
import * as SecureStore from 'expo-secure-store'

import { ACCESS_TKN, API_URL } from '@/lib/constants'

const EP = `${API_URL}/my-items`

export const useMyItems = (userId: number | string) => {
  const getMyItems = async () => {
    const ep = `${EP}/${userId}`

    try {
      const AT = await SecureStore.getItemAsync(ACCESS_TKN)
      const res = await axios.get<MyItems>(ep, {
        headers: {
          Authorization: `Bearer ${AT}`,
        },
      })
      return res.data
    } catch (err) {
      let errorMsg = 'Something went wrong while fetching your items'
      if (isAxiosError(err)) {
        errorMsg = err.message
      }
      throw new Error(errorMsg)
    }
  }

  return useQuery({ queryKey: ['my-items'], queryFn: getMyItems })
}
