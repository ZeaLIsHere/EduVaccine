import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TagProps {
  text: string;
  onRemove?: () => void;
  removable?: boolean;
}

export function Tag({
  text,
  onRemove,
  removable = true,
}: TagProps): React.ReactElement {
  return (
    <View className="flex-row items-center bg-primary-50 border border-primary-200 rounded-full px-3 py-1.5 mr-2 mb-2">
      <Text className="font-worksans-medium text-sm text-primary">{text}</Text>
      {removable && onRemove && (
        <TouchableOpacity onPress={onRemove} className="ml-1.5">
          <Ionicons name="close" size={16} color="#1A6B8A" />
        </TouchableOpacity>
      )}
    </View>
  );
}
