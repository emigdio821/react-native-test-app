import React from 'react'
import { Tabs } from 'expo-router'
import { HomeIcon, ImageIcon, ShoppingBasketIcon, UserIcon } from 'lucide-react-native'

// import { useClientOnlyValue } from '@/hooks/useClientOnlyValue'

export default function TabLayout() {
  // const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // headerShown: useClientOnlyValue(false, true),
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
          title: 'Home',
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="pictures"
        options={{
          href: null,
          title: 'Pictures',
          tabBarIcon: ({ color }) => <ImageIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-items"
        options={{
          title: 'My items',
          tabBarIcon: ({ color }) => <ShoppingBasketIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <UserIcon color={color} />,
        }}
      />
    </Tabs>
  )
}
