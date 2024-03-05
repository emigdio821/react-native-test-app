// import '@tamagui/core/reset.css'
import React, { useEffect } from 'react'
import { tamaguiConfig } from '@/tamagui.config'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useColorScheme } from 'react-native'
import { TamaguiProvider } from 'tamagui'

export { ErrorBoundary } from 'expo-router'

void SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  useEffect(() => {
    if (loaded) {
      void SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) return null

  return <RootLayoutNav />
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()
  const theme = colorScheme ?? undefined

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={theme}>
      <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false, headerTitle: 'Home' }} />
          <Stack.Screen name="test-view" options={{ headerTitle: 'Test page' }} />
          <Stack.Screen
            name="(modals)/edit-profile"
            options={{ presentation: 'modal', headerTitle: 'Edit profile' }}
          />
          <Stack.Screen name="category/[id]" options={{ headerTitle: '' }} />
          <Stack.Screen name="category/item/[id]" options={{ headerTitle: 'Item details' }} />
          <Stack.Screen
            name="(modals)/borrow-form"
            options={{ headerTitle: 'Borrow', presentation: 'modal' }}
          />
        </Stack>
      </ThemeProvider>
    </TamaguiProvider>
  )
}
