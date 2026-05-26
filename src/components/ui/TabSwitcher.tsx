import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { clsx } from 'clsx';

interface TabSwitcherProps {
  tabs: string[];
  activeIndex: number;
  onTabPress: (index: number) => void;
}

export function TabSwitcher({
  tabs,
  activeIndex,
  onTabPress,
}: TabSwitcherProps): React.ReactElement {
  return (
    <View className="flex-row border-b border-border">
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={tab}
          onPress={() => onTabPress(index)}
          className={clsx(
            'pb-3 mr-6',
            index === activeIndex && 'border-b-2 border-primary'
          )}
          activeOpacity={0.7}
        >
          <Text
            className={clsx(
              'font-worksans-medium text-base',
              index === activeIndex ? 'text-primary' : 'text-content-muted'
            )}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
