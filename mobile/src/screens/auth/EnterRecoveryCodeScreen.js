import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { passwordRecoveryService } from '../../services/api';
import { useTheme } from '../../utils/ThemeContext';
import Container from '../../components/Container';
import Text from '../../components/Text';

const EnterRecoveryCodeScreen = ({ route, navigation }) => {
  const { usernameOrEmail } = route.params;
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const handleValidate = async () => {
    setLoading(true);
    try {
      await passwordRecoveryService.validateCode(usernameOrEmail, code);
      navigation.navigate('ResetPassword', { usernameOrEmail, code });
    } catch (error) {
      Alert.alert('Error', error.response?.data?.msg || 'Código inválido o expirado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={[styles.container, { backgroundColor: theme.background.primary }]}> 
      <Text variant="h2" color="primary" style={styles.title}>Ingresa el código recibido</Text>
      <TextInput
        placeholder="Código de recuperación"
        value={code}
        onChangeText={setCode}
        style={[
          styles.input,
          {
            backgroundColor: theme.background.card,
            color: theme.text.primary,
            borderColor: theme.border.color,
          },
        ]}
        placeholderTextColor={theme.text.disabled}
        keyboardType="numeric"
        autoCapitalize="none"
      />
      <Button title={loading ? 'Validando...' : 'Validar código'} onPress={handleValidate} disabled={loading} />
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

export default EnterRecoveryCodeScreen; 