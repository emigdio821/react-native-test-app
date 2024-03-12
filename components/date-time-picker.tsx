import React, { useEffect, useState } from 'react'
import { Pressable, View } from 'react-native'
import DateTimePickerModal, { type DateTimePickerProps } from 'react-native-modal-datetime-picker'

import { NAV_THEME } from '@/lib/constants'
import { formatDate, formatDateTime, formatTime } from '@/lib/utils'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { Input } from '@/components/ui/input'
import { CalendarClockIcon, CalendarIcon, ClockIcon } from '@/components/icons'

type PickerProps = {
  trigger?: React.ReactNode
  onConfirm?: (date: Date) => void
  onCancel?: () => void
} & Omit<DateTimePickerProps, 'onCancel' | 'onConfirm'>

export function DateTimePicker(props: PickerProps) {
  const { mode, trigger, onConfirm } = props
  const [show, setShow] = useState(false)
  const [value, setValue] = useState(props.date)
  const { isDarkColorScheme } = useColorScheme()

  useEffect(() => {
    setValue(props.date)
  }, [props.date])

  const hideDatePicker = () => {
    setShow(false)
  }

  const handleConfirm = (date: Date) => {
    hideDatePicker()
    setValue(date)
    onConfirm && onConfirm(date)
  }

  const handleModeIcon = () => {
    const defaultIcon = <CalendarIcon size={16} className="text-primary" />

    switch (mode) {
      case 'date':
        return defaultIcon
      case 'time':
        return <ClockIcon size={16} className="text-primary" />
      case 'datetime':
        return <CalendarClockIcon size={16} className="text-primary" />
      default:
        return defaultIcon
    }
  }

  const handleValue = () => {
    if (!value) return ''

    switch (mode) {
      case 'date':
        return formatDate(value)
      case 'time':
        return formatTime(value)
      case 'datetime':
        return formatDateTime(value)
      default:
        return formatDate(value)
    }
  }

  return (
    <Pressable
      onPress={() => {
        setShow(true)
      }}
      style={({ pressed }) => ({
        opacity: pressed ? 0.9 : 1,
      })}
    >
      {trigger ?? (
        <View className="relative items-center justify-center">
          <Input pointerEvents="none" readOnly value={handleValue()} className="w-full pr-9" />
          <View className="absolute right-0 pr-3">{handleModeIcon()}</View>
        </View>
      )}

      <DateTimePickerModal
        mode={mode}
        date={value}
        isVisible={show}
        onChange={props.onChange}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        buttonTextColorIOS={isDarkColorScheme ? NAV_THEME.dark.primary : NAV_THEME.light.primary}
        {...props}
      />
    </Pressable>
  )
}
