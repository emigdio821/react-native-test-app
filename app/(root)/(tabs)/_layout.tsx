import React from 'react'
import { Link, Tabs } from 'expo-router'
import { HomeIcon, ImageIcon, UserIcon } from 'lucide-react-native'
import { Pressable } from 'react-native'
import { Text } from 'tamagui'

import { useClientOnlyValue } from '@/hooks/useClientOnlyValue'

export default function TabLayout() {
  // const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        headerTitleStyle: {
          fontFamily: 'InterBold',
        },
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="pictures"
        options={{
          title: 'Pictures',
          tabBarIcon: ({ color }) => <ImageIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <UserIcon color={color} />,
          headerRight: () => (
            <Link href="/(root)/(modals)/edit-profile" asChild>
              <Pressable>
                <Text mr="$2" col="$accentColor">
                  Edit
                </Text>
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  )
}
