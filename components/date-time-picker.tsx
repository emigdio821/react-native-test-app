import React, { useEffect, useState } from 'react'
import tamaguiConfig from '@/tamagui.config'
import { CalendarClockIcon, CalendarIcon, ClockIcon } from 'lucide-react-native'
import { Pressable } from 'react-native'
import DateTimePickerModal, { type DateTimePickerProps } from 'react-native-modal-datetime-picker'
import { Input, styled, XStack } from 'tamagui'

import { formatDate, formatDateTime, formatTime } from '@/lib/utils'

type PickerProps = {
  trigger?: React.ReactNode
  onConfirm?: (date: Date) => void
  onCancel?: () => void
} & Omit<DateTimePickerProps, 'onCancel' | 'onConfirm'>

const DateTimePicker = (props: PickerProps) => {
  const { mode, trigger, onConfirm } = props
  const [show, setShow] = useState(false)
  const [value, setValue] = useState(props.date)

  useEffect(() => {
    setValue(props.date)
  }, [props.date])

  const hideDatePicker = () => {
    setShow(false)
  }

  const handleConfirm = (date: Date) => {
    setValue(date)
    onConfirm && onConfirm(date)
    hideDatePicker()
  }

  const handleModeIcon = () => {
    const defaultIcon = <StyledCalendarIcon />

    switch (mode) {
      case 'date':
        return defaultIcon
      case 'time':
        return <StyledClockIcon />
      case 'datetime':
        return <StyledCalendarClockIcon />
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
        <XStack alignItems="center" justifyContent="flex-end">
          <Input
            readOnly
            flexGrow={1}
            paddingEnd="$8"
            editable={false}
            pointerEvents="none"
            value={handleValue()}
          />
          <XStack paddingEnd="$3" position="absolute">
            {handleModeIcon()}
          </XStack>
        </XStack>
      )}

      <DateTimePickerModal
        mode={mode}
        date={value}
        buttonTextColorIOS={tamaguiConfig.themes.dark.accentColor.val}
        isVisible={show}
        onChange={props.onChange}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        {...props}
      />
    </Pressable>
  )
}

const StyledCalendarIcon = styled(CalendarIcon, {
  name: 'StyledCalendarIcon',
  color: '$accentColor',
})
const StyledClockIcon = styled(ClockIcon, {
  name: 'StyledClockIcon',
  color: '$accentColor',
})
const StyledCalendarClockIcon = styled(CalendarClockIcon, {
  name: 'StyledCalendarClockIcon',
  color: '$accentColor',
})

export default DateTimePicker
