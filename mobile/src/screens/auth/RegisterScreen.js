import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import { useTheme } from '../../utils/ThemeContext';
import Container from '../../components/Container';
import Text from '../../components/Text';
import Button from '../../components/Button';
import { authService } from '../../services/api';

const RegisterScreen = ({ navigation }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const validateForm = () => {
    if (!formData.username || !formData.password || !formData.confirmPassword) {
      Alert.alert('Error', 'Por favor, completa todos los campos obligatorios');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return false;
    }

    if (formData.password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return false;
    }

    if (formData.email && !validateEmail(formData.email)) {
      Alert.alert('Error', 'El formato del correo electrónico no es válido');
      return false;
    }

    return true;
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      
      // Llamar a la API para registrar al usuario
      const response = await authService.register({
        username: formData.username,
        password: formData.password,
        email: formData.email || undefined
      });
      
      setLoading(false);
      
      // Navegar a la pantalla de activación
      navigation.navigate('Activation', {
        userId: response.user.id,
        activationCode: response.user.activationCode,
        username: formData.username,
        password: formData.password
      });
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', error.response?.data?.msg || 'No se pudo completar el registro. Inténtalo de nuevo.');
    }
  };

  return (
    <Container style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text variant="h3" color="primary" style={styles.title}>Crear Cuenta</Text>
          <Text color="secondary" style={styles.subtitle}>
            Regístrate para acceder a la información de tu tribu
          </Text>
          
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text color="secondary" style={styles.label}>Nombre de Usuario</Text>
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
                value={formData.username}
                onChangeText={(text) => handleChange('username', text)}
                autoCapitalize="none"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text color="secondary" style={styles.label}>Correo Electrónico (opcional)</Text>
              <TextInput
                style={[
                  styles.input,
                  { 
                    backgroundColor: theme.background.card,
                    color: theme.text.primary,
                    borderColor: theme.border.color,
                  }
                ]}
                placeholder="Ingresa tu correo electrónico"
                placeholderTextColor={theme.text.disabled}
                value={formData.email}
                onChangeText={(text) => handleChange('email', text)}
                keyboardType="email-address"
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
                value={formData.password}
                onChangeText={(text) => handleChange('password', text)}
                secureTextEntry
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text color="secondary" style={styles.label}>Confirmar Contraseña</Text>
              <TextInput
                style={[
                  styles.input,
                  { 
                    backgroundColor: theme.background.card,
                    color: theme.text.primary,
                    borderColor: theme.border.color,
                  }
                ]}
                placeholder="Confirma tu contraseña"
                placeholderTextColor={theme.text.disabled}
                value={formData.confirmPassword}
                onChangeText={(text) => handleChange('confirmPassword', text)}
                secureTextEntry
              />
            </View>
            
            <Text color="secondary" style={styles.infoText}>
              Después de registrarte, recibirás un código de activación que deberás usar con el comando /app en Discord para vincular tu cuenta y activarla.
            </Text>
            
            <Button
              title="Registrarse"
              onPress={handleRegister}
              loading={loading}
              style={styles.registerButton}
            />
            
            <TouchableOpacity 
              onPress={() => navigation.navigate('Login')}
              style={styles.loginLink}
            >
              <Text color="secondary">¿Ya tienes una cuenta? </Text>
              <Text color="accent">Inicia sesión</Text>
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
    paddingVertical: 20,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 24,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 16,
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
  infoText: {
    marginTop: 8,
    marginBottom: 16,
    textAlign: 'center',
    padding: 10,
  },
  registerButton: {
    marginTop: 10,
  },
  loginLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default RegisterScreen; 