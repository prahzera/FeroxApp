import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../utils/ThemeContext';
import { AuthContext } from '../utils/AuthContext';

// Importar pantallas de autenticación
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ActivationScreen from '../screens/auth/ActivationScreen';
import RecoverPasswordScreen from '../screens/auth/RecoverPasswordScreen';
import EnterRecoveryCodeScreen from '../screens/auth/EnterRecoveryCodeScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';

// Importar navegador de pestañas
import TabNavigator from './TabNavigator';

// Importar pantallas adicionales
import TribeLogScreen from '../screens/tribe/TribeLogScreen';
import TribeMembersScreen from '../screens/tribe/TribeMembersScreen';
import TribeDinosScreen from '../screens/tribe/TribeDinosScreen';
import ServerInfoScreen from '../screens/server/ServerInfoScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const theme = useTheme();
  
  // Simulamos un proceso de autenticación
  useEffect(() => {
    // Aquí se verificaría si el usuario tiene un token válido
    // Por ahora, simplemente simulamos un inicio de sesión automático después de 1 segundo
    const timer = setTimeout(() => {
      setIsAuthenticated(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.background.elevated,
              borderBottomColor: theme.border.color,
              borderBottomWidth: 1,
            },
            headerTintColor: theme.text.primary,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            contentStyle: {
              backgroundColor: theme.background.primary,
            },
          }}
        >
          {!isAuthenticated ? (
            // Rutas de autenticación
            <>
              <Stack.Screen 
                name="Login" 
                component={LoginScreen} 
                options={{ 
                  title: 'Iniciar Sesión',
                  headerShown: false,
                }} 
              />
              <Stack.Screen 
                name="Register" 
                component={RegisterScreen} 
                options={{ 
                  title: 'Registro',
                }} 
              />
              <Stack.Screen 
                name="Activation" 
                component={ActivationScreen} 
                options={{ 
                  title: 'Activación de Cuenta',
                }} 
              />
              <Stack.Screen
                name="RecoverPassword"
                component={RecoverPasswordScreen}
                options={{ title: 'Recuperar contraseña' }}
              />
              <Stack.Screen
                name="EnterRecoveryCode"
                component={EnterRecoveryCodeScreen}
                options={{ title: 'Código de recuperación' }}
              />
              <Stack.Screen
                name="ResetPassword"
                component={ResetPasswordScreen}
                options={{ title: 'Nueva contraseña' }}
              />
            </>
          ) : (
            // Rutas de la aplicación
            <>
              <Stack.Screen 
                name="Main" 
                component={TabNavigator} 
                options={{ 
                  headerShown: false 
                }} 
              />
              <Stack.Screen 
                name="TribeLog" 
                component={TribeLogScreen} 
                options={{ 
                  title: 'Registro de Tribu',
                }} 
              />
              <Stack.Screen 
                name="TribeMembers" 
                component={TribeMembersScreen} 
                options={{ 
                  title: 'Miembros de la Tribu',
                }} 
              />
              <Stack.Screen 
                name="TribeDinos" 
                component={TribeDinosScreen} 
                options={{ 
                  title: 'Dinosaurios de la Tribu',
                }} 
              />
              <Stack.Screen 
                name="ServerInfo" 
                component={ServerInfoScreen} 
                options={{ 
                  title: 'Información del Servidor',
                }} 
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default AppNavigator; 