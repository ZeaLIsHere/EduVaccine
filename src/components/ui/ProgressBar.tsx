import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';

interface ProgressBarProps {
  percentage: number;
  showLabel?: boolean;
  height?: number;
  color?: string;
  backgroundColor?: string;
}

export function ProgressBar({
  percentage,
  showLabel = true,
  height = 10,
  color = '#1A6B8A',
  backgroundColor = '#E8F4F8',
}: ProgressBarProps): React.ReactElement {
  const clampedPercentage = Math.min(100, Math.max(0, percentage));
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animatedWidth, {
      toValue: clampedPercentage,
      useNativeDriver: false,
      speed: 4,
      bounciness: 2,
    }).start();
  }, [clampedPercentage, animatedWidth]);

  const widthInterpolated = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View>
      {showLabel && (
        <View className="flex-row justify-between items-center mb-1">
          <Text className="font-worksans text-sm text-content-secondary">
            Progres berdasarkan usia (6 bln)
          </Text>
          <Text className="font-poppins-bold text-sm text-primary">
            {clampedPercentage}%
          </Text>
        </View>
      )}
      <View
        className="w-full rounded-full overflow-hidden"
        style={{ height, backgroundColor }}
      >
        <Animated.View
          style={{
            width: widthInterpolated,
            height: '100%',
            backgroundColor: color,
            borderRadius: 999,
          }}
        />
      </View>
    </View>
  );
}
