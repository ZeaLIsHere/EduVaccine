import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  onRatingChange: (rating: number) => void;
  size?: number;
  color?: string;
}

export function StarRating({
  rating,
  maxStars = 5,
  onRatingChange,
  size = 36,
  color = '#1A6B8A',
}: StarRatingProps): React.ReactElement {
  return (
    <View className="flex-row justify-center gap-2">
      {Array.from({ length: maxStars }, (_, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onRatingChange(index + 1)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={index < rating ? 'star' : 'star-outline'}
            size={size}
            color={index < rating ? color : '#C5C5C5'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}
