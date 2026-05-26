import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle } from 'react-native';
import { clsx } from 'clsx';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  fullWidth = true,
  style,
}: ButtonProps): React.ReactElement {
  const baseClasses = 'flex-row items-center justify-center rounded-button';

  const variantClasses = {
    primary: 'bg-primary',
    outline: 'bg-transparent border-2 border-primary',
    ghost: 'bg-transparent',
    danger: 'bg-danger',
  };

  const sizeClasses = {
    small: 'px-4 py-2',
    medium: 'px-6 py-3.5',
    large: 'px-8 py-4',
  };

  const textVariantClasses = {
    primary: 'text-white',
    outline: 'text-primary',
    ghost: 'text-primary',
    danger: 'text-white',
  };

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        disabled && 'opacity-50'
      )}
      style={style}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' || variant === 'danger' ? '#FFFFFF' : '#1A6B8A'}
          size="small"
        />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text
            className={clsx(
              'font-poppins-semibold',
              textVariantClasses[variant],
              textSizeClasses[size],
              icon ? 'ml-2' : ''
            )}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}
