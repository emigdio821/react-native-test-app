import '@/styles/global.css'

import * as React from 'react'
import { ThemeProvider, type Theme } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'react-native'
import { SheetProvider } from 'react-native-actions-sheet'
// import { Platform } from 'react-native'
import { DevToolsBubble } from 'react-native-react-query-devtools'

import { NAV_THEME } from '@/lib/constants'
// import { storage } from '@/lib/storage'
// import { useColorScheme } from '@/hooks/use-color-scheme'
import { PortalHost } from '@/components/primitives/portal'

import '@/components/sheets'

// import { ThemeToggle } from '@/components/ThemeToggle'

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
}
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
}

const queryClient = new QueryClient()
export { ErrorBoundary } from 'expo-router'

// void SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const isDarkColorScheme = colorScheme === 'dark'

  // const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false)

  // React.useEffect(() => {
  //   async function handleAssets() {
  //     try {
  //       setColorScheme('system')
  //     } catch (err) {
  //       console.log('Handle assets error:', err)
  //     } finally {
  //       setIsColorSchemeLoaded(true)
  //       await SplashScreen.hideAsync()
  //     }
  //   }

  //   void handleAssets()
  // }, [setColorScheme])

  // if (!isColorSchemeLoaded) {
  //   return null
  // }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <QueryClientProvider client={queryClient}>
        <SheetProvider>
          <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
          <Slot />
          <PortalHost />
        </SheetProvider>
        <DevToolsBubble />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
