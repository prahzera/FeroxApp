import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import { useTheme } from '../utils/ThemeContext';

const Text = ({ 
  children, 
  style, 
  variant = 'body', 
  color = 'primary',
  bold = false,
  italic = false,
  center = false,
  ...props 
}) => {
  const theme = useTheme();
  
  const getColor = () => {
    if (color === 'primary') return theme.text.primary;
    if (color === 'secondary') return theme.text.secondary;
    if (color === 'accent') return theme.text.accent;
    if (color === 'error') return theme.text.error;
    if (color === 'success') return theme.text.success;
    if (color === 'warning') return theme.text.warning;
    if (color === 'disabled') return theme.text.disabled;
    return color; // Si es un color personalizado
  };
  
  return (
    <RNText 
      style={[
        styles.text,
        styles[variant],
        { color: getColor() },
        bold && styles.bold,
        italic && styles.italic,
        center && styles.center,
        style
      ]} 
      {...props}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  h2: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  h3: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  h4: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  h5: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  body: {
    fontSize: 16,
  },
  caption: {
    fontSize: 14,
  },
  small: {
    fontSize: 12,
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
  center: {
    textAlign: 'center',
  },
});

export default Text; 