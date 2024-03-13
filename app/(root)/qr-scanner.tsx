import React, { useState } from 'react'
import * as Haptics from 'expo-haptics'
import { Linking, ScrollView, StyleSheet, View } from 'react-native'
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
  type CameraPosition,
} from 'react-native-vision-camera'

import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import ErrorCard from '@/components/error-card'
import {
  FlashlightIcon,
  FlashlightOffIcon,
  RotateCcwSquareIcon,
  SwitchCameraIcon,
} from '@/components/icons'

export default function QrScanner() {
  const [cameraToUse, setCameraToUse] = useState<CameraPosition>('back')
  const [torch, setTorch] = useState(false)
  const [isActiveCam, setActiveCam] = useState(true)
  const [qrData, setQrData] = useState<string>()
  const device = useCameraDevice(cameraToUse, {
    physicalDevices: ['ultra-wide-angle-camera', 'wide-angle-camera', 'telephoto-camera'],
  })
  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: (codes) => {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      setActiveCam(false)
      setQrData(codes[0].value)
    },
  })
  const { hasPermission } = useCameraPermission()

  if (!hasPermission) {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <ErrorCard
          msg="We dont have permissions to use your camera"
          action={() => {
            void Linking.openSettings()
          }}
          actionMsg="Allow app to use your camera"
        />
      </ScrollView>
    )
  }

  if (!device) {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <ErrorCard msg="Your device is not supported" />
      </ScrollView>
    )
  }

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View className="m-2 items-center justify-center gap-2">
        <View className="rounded-xl border-4 border-primary p-1.5">
          <View className="mx-auto h-64 w-64 overflow-hidden rounded-lg">
            <Camera
              device={device}
              style={styles.camera}
              isActive={isActiveCam}
              codeScanner={codeScanner}
              torch={torch ? 'on' : 'off'}
            />
          </View>
        </View>
        <View className="flex-row items-center gap-2">
          <Button
            size="icon"
            variant="outline"
            disabled={!isActiveCam}
            onPress={() => {
              setCameraToUse((prev) => (prev === 'back' ? 'front' : 'back'))
            }}
          >
            <SwitchCameraIcon size={16} className="text-foreground" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            disabled={!isActiveCam}
            onPress={() => {
              setTorch((prev) => !prev)
            }}
          >
            {torch ? (
              <FlashlightOffIcon size={16} className="text-foreground" />
            ) : (
              <FlashlightIcon size={16} className="text-foreground" />
            )}
          </Button>
          <Button
            size="icon"
            variant="outline"
            disabled={isActiveCam}
            onPress={() => {
              setActiveCam(true)
              setQrData(undefined)
            }}
          >
            <RotateCcwSquareIcon size={16} className="text-foreground" />
          </Button>
        </View>
        {qrData && (
          <View>
            <Text>{qrData}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  camera: {
    height: 256,
    width: 256,
  },
})
