import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../utils/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Container = ({ 
  children, 
  style, 
  centered = false, 
  padded = true,
  elevated = false,
  secondary = false,
  useSafeArea = true,
  ...props 
}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  
  return (
    <View 
      style={[
        styles.container,
        {
          backgroundColor: secondary 
            ? theme.background.secondary 
            : theme.background.primary,
          padding: padded ? theme.spacing.md : 0,
          // Aplicar márgenes de seguridad cuando useSafeArea es true
          paddingBottom: useSafeArea && insets.bottom > 0 ? insets.bottom + (padded ? 0 : theme.spacing.md) : padded ? theme.spacing.md : 0,
          paddingTop: useSafeArea ? insets.top : 0,
        },
        centered && styles.centered,
        elevated && theme.shadow.medium,
        style
      ]} 
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Container; 