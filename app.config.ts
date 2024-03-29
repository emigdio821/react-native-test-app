export default {
  expo: {
    name: 'avocadoapp',
    slug: 'avocadoapp',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.emigdio.avocadoapp',
    },
    android: {
      package: 'com.emigdio.avocadoapp',
      adaptiveIcon: {
        foregroundImage: './assets/images/icon.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-secure-store',
        {
          faceIDPermission: 'Allow $(PRODUCT_NAME) to access your Face ID biometric data.',
        },
      ],
      [
        'react-native-vision-camera',
        {
          cameraPermissionText: '$(PRODUCT_NAME) needs access to your Camera.',
          enableCodeScanner: true,
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
  },
}
