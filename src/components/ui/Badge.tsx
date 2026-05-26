import React from 'react';
import { View, Text } from 'react-native';
import { clsx } from 'clsx';

interface BadgeProps {
  text: string;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'muted';
  size?: 'small' | 'medium';
  icon?: React.ReactNode;
}

export function Badge({
  text,
  variant = 'primary',
  size = 'medium',
  icon,
}: BadgeProps): React.ReactElement {
  const variantClasses = {
    primary: 'bg-primary-50 border-primary-200',
    success: 'bg-success-light',
    warning: 'bg-warning-light',
    danger: 'bg-danger-light',
    info: 'bg-primary-50',
    muted: 'bg-surface-muted',
  };

  const textClasses = {
    primary: 'text-primary',
    success: 'text-success',
    warning: 'text-yellow-700',
    danger: 'text-danger',
    info: 'text-primary',
    muted: 'text-content-muted',
  };

  const sizeClasses = {
    small: 'px-2 py-0.5',
    medium: 'px-3 py-1',
  };

  return (
    <View
      className={clsx(
        'flex-row items-center rounded-badge',
        variantClasses[variant],
        sizeClasses[size]
      )}
    >
      {icon && <View className="mr-1">{icon}</View>}
      <Text
        className={clsx(
          'font-poppins-semibold',
          textClasses[variant],
          size === 'small' ? 'text-xs' : 'text-sm'
        )}
      >
        {text}
      </Text>
    </View>
  );
}
