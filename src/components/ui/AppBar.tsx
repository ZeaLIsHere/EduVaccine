import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useResponsive } from '../../utils/useResponsive';

interface AppBarProps {
  onNotificationPress?: () => void;
  hasNotification?: boolean;
}

export function AppBar({
  onNotificationPress,
  hasNotification = true,
}: AppBarProps): React.ReactElement {
  const { isTablet, headerIconSize, px } = useResponsive();

  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!hasNotification) return;
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.spring(pulseAnim, {
          toValue: 1.4,
          useNativeDriver: true,
          speed: 12,
          bounciness: 8,
        }),
        Animated.spring(pulseAnim, {
          toValue: 1,
          useNativeDriver: true,
          speed: 12,
          bounciness: 8,
        }),
        Animated.delay(2000),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [hasNotification, pulseAnim]);

  const avatarSize = isTablet ? 48 : 40;
  const logoFontSize = isTablet ? 26 : 22;

  return (
    <View
      style={{ paddingHorizontal: px }}
      className="flex-row items-center justify-between pt-4 pb-2"
    >
      <View className="flex-row items-center">
        <View
          style={{ width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 }}
          className="bg-primary-50 items-center justify-center mr-3"
        >
          <Ionicons name="happy-outline" size={headerIconSize + 2} color="#1A6B8A" />
        </View>
        <Text
          style={{ fontSize: logoFontSize }}
          className="font-poppins-bold text-primary"
        >
          eduVaccin
        </Text>
      </View>

      <TouchableOpacity onPress={onNotificationPress} className="relative p-1">
        <Ionicons name="notifications-outline" size={isTablet ? 30 : 26} color="#1A2B3C" />
        {hasNotification && (
          <Animated.View
            style={{ transform: [{ scale: pulseAnim }] }}
            className="absolute top-0.5 right-0.5 w-3 h-3 bg-danger rounded-full border-2 border-white"
          />
        )}
      </TouchableOpacity>
    </View>
  );
}
