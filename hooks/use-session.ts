import { useEffect, useState } from 'react'
import type { User } from '@/types'
import * as SecureStore from 'expo-secure-store'

import { storage } from '@/lib/storage'

const useSession = () => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    async function getAccessToken() {
      try {
        const accessToken = await SecureStore.getItemAsync('accessToken')
        if (!accessToken) throw new Error('Invalid/expired access token')

        const user = storage.getString('user')
        if (user) {
          const parsedUser: User = JSON.parse(user)
          setUser(parsedUser ?? null)
        }
      } catch (err) {
      } finally {
        setLoading(false)
      }
    }

    void getAccessToken()
  }, [])

  return { user, isLoading: loading }
}

export default useSession
