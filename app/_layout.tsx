// // import '@tamagui/core/reset.css'
import React, { useEffect } from 'react'
import { tamaguiConfig } from '@/tamagui.config'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useFonts } from 'expo-font'
import { Slot } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useColorScheme } from 'react-native'
import { DevToolsBubble } from 'react-native-react-query-devtools'
import { TamaguiProvider } from 'tamagui'

export { ErrorBoundary } from 'expo-router'

void SplashScreen.preventAutoHideAsync()

const queryClient = new QueryClient()

export default function Root() {
  const colorScheme = useColorScheme()
  const theme = colorScheme ?? undefined

  const [loaded] = useFonts({
    // Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    // InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),

    Inter: require('@/assets/fonts/Figtree-Medium.ttf'),
    InterBold: require('@/assets/fonts/Figtree-Bold.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      void SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) return null

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={tamaguiConfig} defaultTheme={theme}>
        <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
          <Slot />
        </ThemeProvider>
      </TamaguiProvider>
      <DevToolsBubble />
    </QueryClientProvider>
  )
}
