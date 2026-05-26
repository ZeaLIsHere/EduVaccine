import React from 'react';
import { View, TextInput, Text, ViewStyle } from 'react-native';
import { clsx } from 'clsx';

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  unit?: string;
  icon?: React.ReactNode;
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
  style?: ViewStyle;
}

export function Input({
  label,
  value,
  onChangeText,
  placeholder = '',
  keyboardType = 'default',
  unit,
  icon,
  multiline = false,
  numberOfLines = 1,
  editable = true,
  style,
}: InputProps): React.ReactElement {
  return (
    <View className="mb-4" style={style}>
      <Text className="font-worksans-medium text-sm text-content-secondary mb-1.5">
        {label}
      </Text>
      <View className="flex-row items-center bg-surface border border-border rounded-input px-4 py-3">
        {icon && <View className="mr-3">{icon}</View>}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#8A9BAC"
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={editable}
          className={clsx(
            'flex-1 font-worksans text-base text-content-primary',
            multiline && 'min-h-[80px] text-top'
          )}
        />
        {unit && (
          <Text className="font-worksans text-content-muted ml-2">{unit}</Text>
        )}
      </View>
    </View>
  );
}
