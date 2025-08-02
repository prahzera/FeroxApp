import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../utils/ThemeContext';

const Card = ({ 
  children, 
  style, 
  onPress,
  elevated = true,
  padded = true,
  ...props 
}) => {
  const theme = useTheme();
  
  const CardComponent = onPress ? TouchableOpacity : View;
  
  return (
    <CardComponent 
      style={[
        styles.card,
        {
          backgroundColor: theme.background.card,
          padding: padded ? theme.spacing.md : 0,
          borderRadius: theme.borderRadius.md,
          borderWidth: 1,
          borderColor: theme.border.color,
        },
        elevated && theme.shadow.small,
        style
      ]} 
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      {...props}
    >
      {children}
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    overflow: 'hidden',
  },
});

export default Card; 