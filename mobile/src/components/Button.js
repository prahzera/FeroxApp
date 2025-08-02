import React from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../utils/ThemeContext';
import Text from './Text';

const Button = ({ 
  title, 
  onPress, 
  style, 
  textStyle, 
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  outline = false,
  icon = null,
  iconPosition = 'left',
  ...props 
}) => {
  const theme = useTheme();
  
  const getBackgroundColor = () => {
    if (outline) return 'transparent';
    if (disabled) return theme.background.elevated;
    
    switch (variant) {
      case 'primary':
        return theme.primary;
      case 'secondary':
        return theme.secondary;
      case 'accent':
        return theme.accent;
      case 'success':
        return theme.text.success;
      case 'error':
        return theme.text.error;
      case 'warning':
        return theme.text.warning;
      default:
        return theme.primary;
    }
  };
  
  const getBorderColor = () => {
    if (disabled) return theme.text.disabled;
    
    switch (variant) {
      case 'primary':
        return theme.primary;
      case 'secondary':
        return theme.secondary;
      case 'accent':
        return theme.accent;
      case 'success':
        return theme.text.success;
      case 'error':
        return theme.text.error;
      case 'warning':
        return theme.text.warning;
      default:
        return theme.primary;
    }
  };
  
  const getTextColor = () => {
    if (disabled) return theme.text.disabled;
    if (outline) return getBorderColor();
    
    return '#FFFFFF';
  };
  
  const getPadding = () => {
    switch (size) {
      case 'small':
        return theme.spacing.sm;
      case 'large':
        return theme.spacing.lg;
      default:
        return theme.spacing.md;
    }
  };
  
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: outline ? 2 : 0,
          padding: getPadding(),
          borderRadius: theme.borderRadius.md,
          opacity: disabled ? 0.6 : 1,
        },
        style
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <Text 
          style={[
            styles.text,
            { color: getTextColor() },
            size === 'small' && { fontSize: 14 },
            size === 'large' && { fontSize: 18 },
            textStyle
          ]}
          bold
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  text: {
    textAlign: 'center',
  },
});

export default Button; 