import React from 'react';
import { TouchableOpacity, View } from 'react-native';

interface ToggleProps {
  value: boolean;
  onToggle: () => void;
}

export function Toggle({ value, onToggle }: ToggleProps): React.ReactElement {
  return (
    <TouchableOpacity
      onPress={onToggle}
      activeOpacity={0.8}
      className={`w-[52px] h-[30px] rounded-full justify-center px-0.5 ${
        value ? 'bg-primary' : 'bg-gray-300'
      }`}
    >
      <View
        className={`w-[26px] h-[26px] rounded-full bg-white shadow-sm ${
          value ? 'self-end' : 'self-start'
        }`}
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.15,
          shadowRadius: 2,
          elevation: 2,
        }}
      />
    </TouchableOpacity>
  );
}
