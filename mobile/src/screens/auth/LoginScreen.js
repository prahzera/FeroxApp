import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useTheme } from '../../utils/ThemeContext';
import Container from '../../components/Container';
import Text from '../../components/Text';
import Button from '../../components/Button';
import { authService } from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { AuthContext } from '../../utils/AuthContext';

const LoginScreen = (props) => {
  const theme = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Por favor, completa todos los campos');
      return;
    }
    
    try {
      setLoading(true);
      
      // Llamar a la API de login
      const response = await authService.login({
        username,
        password
      });
      
      setLoading(false);
      
      // Actualizar el estado global de autenticación
      setIsAuthenticated(true);
    } catch (error) {
      setLoading(false);
      
      // Verificar si la cuenta no está activada
      if (error.response && error.response.status === 403) {
        const { activationCode, userId } = error.response.data;
        
        // Navegar a la pantalla de activación
        navigation.navigate('Activation', {
          userId,
          activationCode
        });
      } else {
        Alert.alert('Credenciales incorrectas', error.message || 'No se pudo iniciar sesión. Verifica tus credenciales.');
      }
    }
  };

  return (
    <Container style={styles.container} padded={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../../assets/icon.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
            <Text variant="h2" color="primary" style={styles.title}>Ferox PVP</Text>
            <Text color="secondary" style={styles.subtitle}>
              Gestiona tu tribu en ARK: Survival Evolved
            </Text>
          </View>
          
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text color="secondary" style={styles.label}>Usuario</Text>
              <TextInput
                style={[
                  styles.input,
                  { 
                    backgroundColor: theme.background.card,
                    color: theme.text.primary,
                    borderColor: theme.border.color,
                  }
                ]}
                placeholder="Ingresa tu nombre de usuario"
                placeholderTextColor={theme.text.disabled}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text color="secondary" style={styles.label}>Contraseña</Text>
              <TextInput
                style={[
                  styles.input,
                  { 
                    backgroundColor: theme.background.card,
                    color: theme.text.primary,
                    borderColor: theme.border.color,
                  }
                ]}
                placeholder="Ingresa tu contraseña"
                placeholderTextColor={theme.text.disabled}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
            
            <Button
              title="Iniciar Sesión"
              onPress={handleLogin}
              loading={loading}
              style={styles.loginButton}
            />
            
            <TouchableOpacity
              onPress={() => navigation.navigate('RecoverPassword')}
              style={styles.forgotPasswordLink}
            >
              <Text color="accent">¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => navigation.navigate('Register')}
              style={styles.registerLink}
            >
              <Text color="secondary">¿No tienes una cuenta? </Text>
              <Text color="accent">Regístrate</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  loginButton: {
    marginTop: 10,
  },
  registerLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  forgotPasswordLink: {
    alignItems: 'center',
    marginTop: 16,
  },
});

export default LoginScreen; 