import React from 'react';
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
        <View
          className="h-full rounded-full"
          style={{
            width: `${clampedPercentage}%`,
            backgroundColor: color,
          }}
        />
      </View>
    </View>
  );
}
