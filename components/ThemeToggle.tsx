import { Pressable, View } from 'react-native'

import { storage } from '@/lib/storage'
import { cn } from '@/lib/utils'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { CalendarIcon, ClockIcon } from '@/components/icons'

export function ThemeToggle() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme()
  return (
    <Pressable
      onPress={() => {
        const newTheme = isDarkColorScheme ? 'light' : 'dark'
        setColorScheme(newTheme)
        storage.set('theme', newTheme)
      }}
      className="web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2"
    >
      {({ pressed }) => (
        <View
          className={cn(
            'aspect-square flex-1 items-start justify-center pt-0.5 web:px-5',
            pressed && 'opacity-70',
          )}
        >
          {isDarkColorScheme ? (
            <CalendarIcon className="text-foreground" size={23} strokeWidth={1.25} />
          ) : (
            <ClockIcon className="text-foreground" size={24} strokeWidth={1.25} />
          )}
        </View>
      )}
    </Pressable>
  )
}
