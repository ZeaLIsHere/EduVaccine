import React from 'react';
import { View, ViewStyle } from 'react-native';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'accent' | 'success' | 'danger' | 'warning';
  padding?: 'none' | 'small' | 'medium' | 'large';
  className?: string;
  style?: ViewStyle;
}

export function Card({
  children,
  variant = 'default',
  padding = 'medium',
  className,
  style,
}: CardProps): React.ReactElement {
  const variantClasses = {
    default: 'bg-white',
    elevated: 'bg-white shadow-md',
    outlined: 'bg-white border border-border',
    accent: 'bg-accent-light',
    success: 'bg-success-light border-l-4 border-l-success',
    danger: 'bg-danger-light border border-danger',
    warning: 'bg-warning-light',
  };

  const paddingClasses = {
    none: '',
    small: 'p-3',
    medium: 'p-4',
    large: 'p-6',
  };

  return (
    <View
      className={clsx(
        'rounded-card',
        variantClasses[variant],
        paddingClasses[padding],
        className
      )}
      style={[
        {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.06,
          shadowRadius: 6,
          elevation: 2,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
