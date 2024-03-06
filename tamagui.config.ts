import { config, themes } from '@tamagui/config/v3'
import { createTamagui } from 'tamagui'

export const tamaguiConfig = createTamagui({
  ...config,
  themes: {
    ...themes,
    light: {
      ...themes.light,
      accentColor: '#6eb142',
    },
    dark: {
      ...themes.dark,
      accentColor: '#a6d388',
    },
  },
})

export default tamaguiConfig

export type Conf = typeof tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
