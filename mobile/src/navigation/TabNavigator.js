import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../utils/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Importar pantallas
import HomeScreen from '../screens/HomeScreen';
import TribeScreen from '../screens/TribeScreen';
import ServerScreen from '../screens/ServerScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Tribe') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Server') {
            iconName = focused ? 'server' : 'server-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.text.secondary,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          paddingBottom: 5,
        },
        tabBarStyle: {
          backgroundColor: theme.background.elevated,
          borderTopColor: theme.border.color,
          paddingTop: 5,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 5,
          height: 60 + (insets.bottom > 0 ? insets.bottom - 5 : 0),
          position: 'absolute',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerStyle: {
          backgroundColor: theme.background.elevated,
          borderBottomColor: theme.border.color,
          borderBottomWidth: 1,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: theme.text.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          title: 'Inicio',
        }} 
      />
      <Tab.Screen 
        name="Tribe" 
        component={TribeScreen} 
        options={{ 
          title: 'Mi Tribu',
        }} 
      />
      <Tab.Screen 
        name="Server" 
        component={ServerScreen} 
        options={{ 
          title: 'Servidor',
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ 
          title: 'Perfil',
        }} 
      />
    </Tab.Navigator>
  );
};

export default TabNavigator; 