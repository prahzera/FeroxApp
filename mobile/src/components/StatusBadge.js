import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../utils/ThemeContext';
import Text from './Text';

const StatusBadge = ({ 
  status, 
  style, 
  size = 'medium',
  showText = true,
  ...props 
}) => {
  const theme = useTheme();
  
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'online':
        return theme.status.online;
      case 'offline':
        return theme.status.offline;
      case 'warning':
        return theme.status.warning;
      default:
        return theme.status.neutral;
    }
  };
  
  const getStatusText = () => {
    switch (status.toLowerCase()) {
      case 'online':
        return 'En línea';
      case 'offline':
        return 'Desconectado';
      case 'warning':
        return 'Advertencia';
      default:
        return status;
    }
  };
  
  const getBadgeSize = () => {
    switch (size) {
      case 'small':
        return 8;
      case 'large':
        return 14;
      default:
        return 10;
    }
  };
  
  return (
    <View style={[styles.container, style]} {...props}>
      <View 
        style={[
          styles.badge,
          { 
            backgroundColor: getStatusColor(),
            width: getBadgeSize(),
            height: getBadgeSize(),
            borderRadius: getBadgeSize() / 2,
          }
        ]} 
      />
      {showText && (
        <Text 
          style={styles.text} 
          color="secondary"
          variant={size === 'small' ? 'small' : 'caption'}
        >
          {getStatusText()}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    marginRight: 6,
  },
  text: {
    fontSize: 12,
  },
});

export default StatusBadge; 