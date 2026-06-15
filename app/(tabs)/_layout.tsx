import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Platform } from 'react-native';
import { useResponsive } from '../../src/utils/useResponsive';

function TabIcon({
  name,
  label,
  focused,
}: {
  name: keyof typeof Ionicons.glyphMap;
  label: string;
  focused: boolean;
}): React.ReactElement {
  const { isTablet, tabIconSize } = useResponsive();

  const bubbleSize = isTablet ? 52 : 44;
  const bubbleNegMargin = isTablet ? -6 : -4;

  return (
    <View className="items-center justify-center" style={{ paddingTop: 4, minWidth: isTablet ? 80 : 56 }}>
      {focused ? (
        <View
          style={{
            width: bubbleSize,
            height: bubbleSize,
            borderRadius: bubbleSize / 2,
            backgroundColor: '#1A6B8A',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: bubbleNegMargin,
            shadowColor: '#1A6B8A',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          <Ionicons name={name} size={tabIconSize} color="#FFFFFF" />
        </View>
      ) : (
        <Ionicons name={name} size={tabIconSize} color="#8A9BAC" />
      )}
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        style={{
          fontFamily: 'WorkSans_500Medium',
          fontSize: isTablet ? 12 : 10,
          marginTop: 3,
          color: focused ? '#1A6B8A' : '#8A9BAC',
        }}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout(): React.ReactElement {
  const { isTablet, tabBarHeight } = useResponsive();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? tabBarHeight + 20 : tabBarHeight,
          paddingBottom: Platform.OS === 'ios' ? 24 : 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.06,
          shadowRadius: 10,
          elevation: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="home-outline" label="Beranda" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="edukasi"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="book-outline" label="Edukasi" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="kalender"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="calendar-outline" label="Jadwal" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="person-outline" label="Profil" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
