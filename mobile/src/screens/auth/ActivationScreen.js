import React, { useState, useEffect, useContext } from 'react';
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  Image,
  Alert,
  ActivityIndicator,
  Clipboard
} from 'react-native';
import { useTheme } from '../../utils/ThemeContext';
import Container from '../../components/Container';
import Text from '../../components/Text';
import Button from '../../components/Button';
import { userService } from '../../services/api';
import { authService } from '../../services/api';
import { AuthContext } from '../../utils/AuthContext';

const ActivationScreen = ({ route, navigation }) => {
  const theme = useTheme();
  const { userId, activationCode: initialCode, username, password } = route.params || {};
  const { setIsAuthenticated } = useContext(AuthContext);
  
  const [loading, setLoading] = useState(false);
  const [activationCode, setActivationCode] = useState(initialCode || '');
  const [isActive, setIsActive] = useState(false);
  const [discordLinked, setDiscordLinked] = useState(false);
  
  useEffect(() => {
    checkUserStatus();
  }, []);

  useEffect(() => {
    // Si la cuenta se activa y tenemos username y password, hacer login automático
    if (isActive && username && password) {
      handleAutoLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  const handleAutoLogin = async () => {
    try {
      await authService.login({ username, password });
      // Actualizar el estado global de autenticación
      setIsAuthenticated(true);
    } catch (error) {
      Alert.alert('Error', 'La cuenta fue activada pero no se pudo iniciar sesión automáticamente. Por favor, inicia sesión manualmente.');
    }
  };
  
  const checkUserStatus = async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      const response = await userService.checkUserStatus(userId);
      setIsActive(response.isActive);
      setDiscordLinked(response.discordLinked);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error al verificar estado del usuario:', error);
    }
  };
  
  const generateNewCode = async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      const response = await userService.generateActivationCode(userId);
      setActivationCode(response.activationCode);
      setLoading(false);
      
      Alert.alert(
        'Código Generado',
        'Se ha generado un nuevo código de activación.'
      );
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'No se pudo generar un nuevo código de activación.');
    }
  };
  
  const copyToClipboard = () => {
    Clipboard.setString(activationCode);
    Alert.alert('Copiado', 'El código de activación ha sido copiado al portapapeles.');
  };
  
  if (loading) {
    return (
      <Container style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.accent.primary} />
        <Text style={styles.loadingText}>Cargando...</Text>
      </Container>
    );
  }
  
  if (isActive) {
    return (
      <Container style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.successContainer}>
            <Image 
              source={require('../../../assets/check-circle.png')} 
              style={styles.successIcon}
              defaultSource={require('../../../assets/check-circle.png')}
            />
            <Text variant="h3" color="primary" style={styles.title}>¡Cuenta Activada!</Text>
            <Text color="secondary" style={styles.subtitle}>
              Tu cuenta ha sido activada correctamente y está vinculada con Discord.
            </Text>
            {/* Si no hay username/password, mostrar el botón para ir a Login manualmente */}
            {!(username && password) && (
              <Button
                title="Ir a Inicio"
                onPress={() => navigation.navigate('Login')}
                style={styles.button}
              />
            )}
          </View>
        </ScrollView>
      </Container>
    );
  }
  
  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text variant="h3" color="primary" style={styles.title}>Activación de Cuenta</Text>
        <Text color="secondary" style={styles.subtitle}>
          Para activar tu cuenta, debes vincularla con tu cuenta de Discord.
        </Text>
        
        <View style={styles.codeContainer}>
          <Text color="secondary" style={styles.label}>Tu código de activación:</Text>
          <View style={[styles.codeBox, { backgroundColor: theme.background.card, borderColor: theme.border.color }]}>
            <Text style={styles.codeText}>{activationCode}</Text>
          </View>
          
          <Button
            title="Copiar Código"
            onPress={copyToClipboard}
            style={styles.button}
          />
        </View>
        
        <View style={styles.instructionsContainer}>
          <Text color="secondary" style={styles.instructionsTitle}>Instrucciones:</Text>
          <Text color="secondary" style={styles.instructionsText}>
            1. Copia el código de activación.
          </Text>
          <Text color="secondary" style={styles.instructionsText}>
            2. Abre Discord y ve al servidor donde está el bot de FeroxApp.
          </Text>
          <Text color="secondary" style={styles.instructionsText}>
            3. Usa el comando <Text style={styles.codeCommand}>/app codigo:TUCODIGO</Text> para vincular tu cuenta.
          </Text>
          <Text color="secondary" style={styles.instructionsText}>
            4. Una vez vinculada, tu cuenta se activará automáticamente.
          </Text>
        </View>
        
        <Button
          title="Generar Nuevo Código"
          onPress={generateNewCode}
          style={[styles.button, styles.secondaryButton]}
          textColor={theme.accent.primary}
          backgroundColor={theme.background.card}
        />
        
        <Button
          title="Verificar Estado"
          onPress={checkUserStatus}
          style={[styles.button, styles.secondaryButton]}
          textColor={theme.accent.primary}
          backgroundColor={theme.background.card}
        />
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 32,
  },
  codeContainer: {
    marginBottom: 32,
  },
  label: {
    marginBottom: 8,
  },
  codeBox: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 16,
  },
  codeText: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  button: {
    marginBottom: 16,
  },
  secondaryButton: {
    borderWidth: 1,
  },
  instructionsContainer: {
    marginBottom: 32,
  },
  instructionsTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  instructionsText: {
    marginBottom: 8,
  },
  codeCommand: {
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIcon: {
    width: 100,
    height: 100,
    marginBottom: 24,
  },
});

export default ActivationScreen; 