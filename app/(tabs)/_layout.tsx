import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Platform } from 'react-native';

function TabIcon({ name, label, focused }: { name: keyof typeof Ionicons.glyphMap; label: string; focused: boolean }): React.ReactElement {
  return (
    <View className="items-center justify-center pt-2">
      {focused ? (
        <View className="bg-primary rounded-full w-14 h-14 items-center justify-center -mt-4"
          style={{
            shadowColor: '#1A6B8A',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          <Ionicons name={name} size={24} color="#FFFFFF" />
        </View>
      ) : (
        <Ionicons name={name} size={24} color="#8A9BAC" />
      )}
      <Text
        className={`font-worksans-medium text-xs mt-1 ${
          focused ? 'text-primary' : 'text-content-muted'
        }`}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout(): React.ReactElement {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 88 : 70,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
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
            <TabIcon name="calendar-outline" label="Kalender" focused={focused} />
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
