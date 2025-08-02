import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert, Switch, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../utils/ThemeContext';
import Container from '../components/Container';
import Text from '../components/Text';
import Card from '../components/Card';
import Button from '../components/Button';
import { AuthContext } from '../utils/AuthContext';
import { authService } from '../services/api';

const ProfileScreen = ({ navigation }) => {
  const theme = useTheme();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState({
    tribeLog: true,
    serverEvents: true,
    memberActivity: false,
    serverStatus: true,
  });
  const { setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Obtener datos reales del usuario desde la API
      const userData = await authService.getMe();
      
      // Formatear fecha de registro
      const createdAt = userData.createdAt 
        ? new Date(userData.createdAt).toLocaleDateString('es-ES') 
        : 'No disponible';
      
      // Crear objeto de perfil con datos reales
      setUserProfile({
        id: userData.id,
        username: userData.username,
        email: userData.email || 'No disponible',
        tribe: userData.tribe || 'No asignada',
        tribeRole: userData.tribeRole || 'Miembro',
        level: userData.level || 1,
        joinDate: createdAt,
        lastLogin: 'Hoy',
        discordUsername: userData.discordUsername || 'No vinculado'
      });
    } catch (error) {
      console.error('Error al cargar datos del usuario:', error);
      Alert.alert('Error', 'No se pudieron cargar los datos del perfil');
    } finally {
      setLoading(false);
    }
  };

  const toggleNotification = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          onPress: () => {
            // Eliminar el token de autenticación
            authService.logout();
            // Actualizar el estado global de autenticación
            setIsAuthenticated(false);
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <Container>
      <ScrollView>
        {/* Tarjeta de perfil */}
        <Card style={styles.profileCard}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.primary} />
              <Text color="secondary" style={styles.loadingText}>Cargando información del perfil...</Text>
            </View>
          ) : userProfile ? (
            <View>
              <View style={styles.profileHeader}>
                <View style={styles.avatarContainer}>
                  <View style={[
                    styles.avatar, 
                    { backgroundColor: theme.primary }
                  ]}>
                    <Text variant="h2" style={styles.avatarText}>
                      {userProfile.username.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.profileInfo}>
                  <Text variant="h4" color="primary">{userProfile.username}</Text>
                  <Text color="secondary">Nivel {userProfile.level}</Text>
                  <View style={styles.tribeTag}>
                    <Ionicons name="people" size={14} color={theme.text.secondary} />
                    <Text color="secondary" style={styles.tribeText}>
                      {userProfile.tribe} ({userProfile.tribeRole})
                    </Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.infoRow}>
                <Text color="secondary">Email:</Text>
                <Text>{userProfile.email}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text color="secondary">Fecha de registro:</Text>
                <Text>{userProfile.joinDate}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text color="secondary">Último acceso:</Text>
                <Text>{userProfile.lastLogin}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text color="secondary">Discord:</Text>
                <Text>{userProfile.discordUsername}</Text>
              </View>
              {userProfile.discordId && (
                <View style={styles.infoRow}>
                  <Text color="secondary">Estado:</Text>
                  <View style={styles.statusContainer}>
                    <View style={[styles.statusDot, { backgroundColor: 'green' }]} />
                    <Text>Cuenta verificada</Text>
                  </View>
                </View>
              )}
            </View>
          ) : (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle-outline" size={40} color={theme.error} />
              <Text color="secondary" style={styles.errorText}>No se pudo cargar la información del perfil</Text>
            </View>
          )}
        </Card>
        
        {/* Configuración de notificaciones */}
        <Card style={styles.card}>
          <Text variant="h5" style={styles.sectionTitle}>Notificaciones</Text>
          
          <View style={styles.settingItem}>
            <Text>Registro de tribu</Text>
            <Switch
              trackColor={{ false: theme.background.elevated, true: theme.primary }}
              thumbColor={notifications.tribeLog ? '#fff' : '#f4f3f4'}
              value={notifications.tribeLog}
              onValueChange={() => toggleNotification('tribeLog')}
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text>Eventos del servidor</Text>
            <Switch
              trackColor={{ false: theme.background.elevated, true: theme.primary }}
              thumbColor={notifications.serverEvents ? '#fff' : '#f4f3f4'}
              value={notifications.serverEvents}
              onValueChange={() => toggleNotification('serverEvents')}
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text>Actividad de miembros</Text>
            <Switch
              trackColor={{ false: theme.background.elevated, true: theme.primary }}
              thumbColor={notifications.memberActivity ? '#fff' : '#f4f3f4'}
              value={notifications.memberActivity}
              onValueChange={() => toggleNotification('memberActivity')}
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text>Estado del servidor</Text>
            <Switch
              trackColor={{ false: theme.background.elevated, true: theme.primary }}
              thumbColor={notifications.serverStatus ? '#fff' : '#f4f3f4'}
              value={notifications.serverStatus}
              onValueChange={() => toggleNotification('serverStatus')}
            />
          </View>
        </Card>
        
        {/* Opciones de cuenta */}
        <Card style={styles.card}>
          <Text variant="h5" style={styles.sectionTitle}>Cuenta</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Ionicons name="person" size={20} color={theme.primary} />
              <Text style={styles.menuItemText}>Editar perfil</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.text.secondary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Ionicons name="key" size={20} color={theme.primary} />
              <Text style={styles.menuItemText}>Cambiar contraseña</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.text.secondary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Ionicons name="logo-discord" size={20} color={theme.primary} />
              <Text style={styles.menuItemText}>Actualizar cuenta de Discord</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.text.secondary} />
          </TouchableOpacity>
        </Card>
        
        {/* Botones de acción */}
        <View style={styles.actionButtons}>
          <Button
            title="Cerrar Sesión"
            onPress={handleLogout}
            variant="error"
            style={styles.logoutButton}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  profileCard: {
    marginBottom: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    marginTop: 10,
    textAlign: 'center',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 28,
  },
  profileInfo: {
    flex: 1,
  },
  tribeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  tribeText: {
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  card: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    marginLeft: 12,
  },
  actionButtons: {
    marginBottom: 24,
  },
  logoutButton: {
    marginTop: 8,
  },
});

export default ProfileScreen; 