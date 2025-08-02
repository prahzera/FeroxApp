import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { passwordRecoveryService } from '../../services/api';
import { useTheme } from '../../utils/ThemeContext';
import Container from '../../components/Container';
import Text from '../../components/Text';

const ResetPasswordScreen = ({ route, navigation }) => {
  const { usernameOrEmail, code } = route.params;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const handleReset = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }
    setLoading(true);
    try {
      await passwordRecoveryService.resetPassword(usernameOrEmail, code, newPassword);
      Alert.alert('Éxito', 'Contraseña actualizada. Ahora puedes iniciar sesión.');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', error.response?.data?.msg || 'No se pudo actualizar la contraseña.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={[styles.container, { backgroundColor: theme.background.primary }]}> 
      <Text variant="h2" color="primary" style={styles.title}>Nueva contraseña</Text>
      <TextInput
        placeholder="Nueva contraseña"
        value={newPassword}
        onChangeText={setNewPassword}
        style={[
          styles.input,
          {
            backgroundColor: theme.background.card,
            color: theme.text.primary,
            borderColor: theme.border.color,
          },
        ]}
        placeholderTextColor={theme.text.disabled}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={[
          styles.input,
          {
            backgroundColor: theme.background.card,
            color: theme.text.primary,
            borderColor: theme.border.color,
          },
        ]}
        placeholderTextColor={theme.text.disabled}
        secureTextEntry
      />
      <Button title={loading ? 'Actualizando...' : 'Actualizar contraseña'} onPress={handleReset} disabled={loading} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
    fontSize: 16,
  },
});

export default ResetPasswordScreen; 