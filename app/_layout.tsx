import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import '../global.css';

SplashScreen.preventAutoHideAsync();

export default function RootLayout(): React.ReactElement | null {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular: require('../assets/fonts/Poppins-Regular.ttf'),
    Poppins_500Medium: require('../assets/fonts/Poppins-Medium.ttf'),
    Poppins_600SemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
    Poppins_700Bold: require('../assets/fonts/Poppins-Bold.ttf'),
    WorkSans_400Regular: require('../assets/fonts/WorkSans-Regular.ttf'),
    WorkSans_500Medium: require('../assets/fonts/WorkSans-Medium.ttf'),
    WorkSans_600SemiBold: require('../assets/fonts/WorkSans-SemiBold.ttf'),
    WorkSans_700Bold: require('../assets/fonts/WorkSans-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View className="flex-1 bg-surface-secondary">
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#F5F9FB' },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="pemantauan" />
        <Stack.Screen name="konsultasi" />
        <Stack.Screen name="report" />
        <Stack.Screen name="admin" />
        <Stack.Screen name="quiz" />
        <Stack.Screen name="feedback" />
      </Stack>
    </View>
  );
}
