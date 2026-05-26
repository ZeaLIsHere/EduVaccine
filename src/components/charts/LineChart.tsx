import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path, Circle, Line, Defs, LinearGradient, Stop } from 'react-native-svg';
import { GrowthEntry } from '../../types';

interface LineChartProps {
  data: GrowthEntry[];
  height?: number;
  lineColor?: string;
}

export function LineChart({
  data,
  height = 160,
  lineColor = '#1A6B8A',
}: LineChartProps): React.ReactElement {
  if (data.length === 0) return <View />;

  const padding = { top: 10, right: 20, bottom: 30, left: 10 };
  const chartWidth = 320;
  const chartHeight = height - padding.top - padding.bottom;

  const weights = data.map((d) => d.weight);
  const minWeight = Math.min(...weights) * 0.8;
  const maxWeight = Math.max(...weights) * 1.1;
  const weightRange = maxWeight - minWeight;

  const points = data.map((entry, index) => {
    const x = padding.left + (index / (data.length - 1)) * (chartWidth - padding.left - padding.right);
    const y = padding.top + chartHeight - ((entry.weight - minWeight) / weightRange) * chartHeight;
    return { x, y };
  });

  let pathD = '';
  points.forEach((point, index) => {
    if (index === 0) {
      pathD += `M ${point.x} ${point.y}`;
    } else {
      const prev = points[index - 1];
      const cpx1 = prev.x + (point.x - prev.x) / 3;
      const cpy1 = prev.y;
      const cpx2 = point.x - (point.x - prev.x) / 3;
      const cpy2 = point.y;
      pathD += ` C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${point.x} ${point.y}`;
    }
  });

  const dashY1 = padding.top + chartHeight * 0.25;
  const dashY2 = padding.top + chartHeight * 0.6;

  return (
    <View>
      <Svg width={chartWidth} height={height}>
        <Defs>
          <LinearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={lineColor} stopOpacity="0.2" />
            <Stop offset="1" stopColor={lineColor} stopOpacity="0" />
          </LinearGradient>
        </Defs>

        <Line
          x1={padding.left}
          y1={dashY1}
          x2={chartWidth - padding.right}
          y2={dashY1}
          stroke="#E0E8ED"
          strokeWidth="1"
          strokeDasharray="4,4"
        />
        <Line
          x1={padding.left}
          y1={dashY2}
          x2={chartWidth - padding.right}
          y2={dashY2}
          stroke="#E0E8ED"
          strokeWidth="1"
          strokeDasharray="4,4"
        />

        <Path
          d={pathD}
          stroke={lineColor}
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {points.map((point, index) => (
          <Circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={index === points.length - 1 ? 8 : 5}
            fill={index === points.length - 1 ? lineColor : '#FFFFFF'}
            stroke={lineColor}
            strokeWidth={index === points.length - 1 ? 3 : 2}
          />
        ))}
      </Svg>

      <View className="flex-row justify-between px-2 mt-1">
        {data.map((entry, index) => (
          <Text key={index} className="font-worksans text-xs text-content-muted">
            {entry.label}
          </Text>
        ))}
      </View>
    </View>
  );
}
