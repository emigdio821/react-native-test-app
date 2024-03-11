import { ActivityIndicator, type ActivityIndicatorProps } from 'react-native'

import { cn } from '@/lib/utils'

export function Spinner({ className, ...props }: ActivityIndicatorProps) {
  return <ActivityIndicator className={cn('text-foreground', className)} {...props} />
}
