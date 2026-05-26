import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path, Circle, G } from 'react-native-svg';

interface DonutChartProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  centerLabel?: string;
  centerSubLabel?: string;
}

export function DonutChart({
  percentage,
  size = 180,
  strokeWidth = 24,
  color = '#1A6B8A',
  backgroundColor = '#E8F4F8',
  centerLabel,
  centerSubLabel,
}: DonutChartProps): React.ReactElement {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const filled = (percentage / 100) * circumference;
  const remaining = circumference - filled;
  const center = size / 2;

  const filledPath = describeArc(center, center, radius, 0, (percentage / 100) * 360);
  const remainingPath = describeArc(center, center, radius, (percentage / 100) * 360, 360);

  return (
    <View className="items-center">
      <Svg width={size} height={size}>
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${filled} ${remaining}`}
          strokeDashoffset={circumference / 4}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
        />
        {100 - percentage > 0 && (
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#F1AEB5"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${remaining} ${filled}`}
            strokeDashoffset={circumference / 4 - filled}
            strokeLinecap="round"
            transform={`rotate(-90 ${center} ${center})`}
          />
        )}
      </Svg>
      {(centerLabel || centerSubLabel) && (
        <View className="absolute items-center justify-center" style={{ width: size, height: size }}>
          {centerLabel && (
            <Text className="font-poppins-bold text-2xl text-primary">{centerLabel}</Text>
          )}
          {centerSubLabel && (
            <Text className="font-worksans text-sm text-content-secondary">{centerSubLabel}</Text>
          )}
        </View>
      )}
    </View>
  );
}

function describeArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleInDegrees: number
): { x: number; y: number } {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians),
  };
}
