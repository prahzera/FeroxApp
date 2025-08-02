import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { passwordRecoveryService } from '../../services/api';
import { useTheme } from '../../utils/ThemeContext';
import Container from '../../components/Container';
import Text from '../../components/Text';

const RecoverPasswordScreen = ({ navigation }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const handleRecover = async () => {
    setLoading(true);
    try {
      await passwordRecoveryService.recover(usernameOrEmail);
      Alert.alert('Éxito', 'Revisa tu Discord para el código de recuperación.');
      navigation.navigate('EnterRecoveryCode', { usernameOrEmail });
    } catch (error) {
      Alert.alert('Error', error.response?.data?.msg || 'No se pudo iniciar la recuperación.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={[styles.container, { backgroundColor: theme.background.primary }]}> 
      <Text variant="h2" color="primary" style={styles.title}>Recuperar contraseña</Text>
      <TextInput
        placeholder="Usuario o Email"
        value={usernameOrEmail}
        onChangeText={setUsernameOrEmail}
        style={[
          styles.input,
          {
            backgroundColor: theme.background.card,
            color: theme.text.primary,
            borderColor: theme.border.color,
          },
        ]}
        placeholderTextColor={theme.text.disabled}
        autoCapitalize="none"
      />
      <Button title={loading ? 'Enviando...' : 'Enviar código'} onPress={handleRecover} disabled={loading} />
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

export default RecoverPasswordScreen; 