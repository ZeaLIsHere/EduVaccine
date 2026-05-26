import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { WeeklyScore } from '../../types';

interface BarChartProps {
  data: WeeklyScore[];
  height?: number;
  barColor?: string;
}

export function BarChart({
  data,
  height = 200,
  barColor = '#1A6B8A',
}: BarChartProps): React.ReactElement {
  const maxScore = 100;
  const barWidth = 30;
  const gap = 16;
  const chartWidth = data.length * (barWidth + gap);
  const paddingTop = 20;
  const paddingBottom = 30;
  const chartHeight = height - paddingTop - paddingBottom;

  return (
    <View>
      <View className="flex-row items-end justify-between mb-1" style={{ height }}>
        <View className="justify-between h-full py-2">
          {[100, 80, 60, 40, 20, 0].map((val) => (
            <Text key={val} className="font-worksans text-xs text-content-muted">
              {val}
            </Text>
          ))}
        </View>
        <View className="flex-row items-end flex-1 ml-2 justify-around">
          {data.map((item, index) => {
            const barHeight = (item.score / maxScore) * chartHeight;
            return (
              <View key={index} className="items-center">
                <View
                  className="rounded-t-md"
                  style={{
                    width: barWidth,
                    height: barHeight,
                    backgroundColor: barColor,
                  }}
                />
              </View>
            );
          })}
        </View>
      </View>
      <View className="flex-row justify-around ml-8">
        {data.map((item, index) => (
          <Text key={index} className="font-worksans text-xs text-content-muted text-center" style={{ width: barWidth + gap }}>
            {item.week}
          </Text>
        ))}
      </View>
    </View>
  );
}
