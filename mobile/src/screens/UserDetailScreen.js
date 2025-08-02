import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { userService } from '../services/api';

const UserDetailScreen = ({ route }) => {
  const { userId } = route.params;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const data = await userService.getUserById(userId);
      setUser(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar detalles del usuario');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#f4511e" />
      </View>
    );
  }

  if (error || !user) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error || 'Usuario no encontrado'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Nombre de usuario:</Text>
        <Text style={styles.value}>{user.username}</Text>
        
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email || 'No disponible'}</Text>
        
        <Text style={styles.label}>Discord:</Text>
        <Text style={styles.value}>{user.discordUsername || 'No vinculado'}</Text>
        
        <Text style={styles.label}>Estado:</Text>
        <Text style={styles.value}>{user.isActive ? 'Activo' : 'Pendiente de activación'}</Text>
        
        <Text style={styles.label}>Fecha de registro:</Text>
        <Text style={styles.value}>
          {new Date(user.createdAt).toLocaleDateString('es-ES')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginTop: 12,
  },
  value: {
    fontSize: 18,
    color: '#333',
    marginTop: 4,
    marginBottom: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default UserDetailScreen; 