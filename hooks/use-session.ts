import { useEffect, useState } from 'react'
import { ACCESS_TKN } from '@/lib/constants'
import type { User } from '@/types'
import * as SecureStore from 'expo-secure-store'

import { storage } from '@/lib/storage'

const useSession = () => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    function addUserToStorage() {
      const user = storage.getString('user')
      if (user) {
        const parsedUser: User = JSON.parse(user)
        setUser(parsedUser ?? null)
      }
    }
    async function getAccessToken() {
      try {
        const accessToken = await SecureStore.getItemAsync(ACCESS_TKN)
        if (!accessToken) throw new Error('Invalid/expired access token')
        addUserToStorage()
      } catch (err) {
      } finally {
        setLoading(false)
      }
    }

    void getAccessToken()

    storage.addOnValueChangedListener((key) => {
      if (key === 'user') {
        addUserToStorage()
      }
    })
  }, [])

  return { user, isLoading: loading }
}

export default useSession
