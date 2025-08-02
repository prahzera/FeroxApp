import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../utils/ThemeContext';
import Container from '../components/Container';
import Text from '../components/Text';
import Card from '../components/Card';
import Button from '../components/Button';
import StatusBadge from '../components/StatusBadge';
import { serverService, tribeService } from '../services/api';

const HomeScreen = ({ navigation }) => {
  const theme = useTheme();
  const [serverStatus, setServerStatus] = useState(null);
  const [tribeInfo, setTribeInfo] = useState(null);
  const [onlinePlayers, setOnlinePlayers] = useState([]);
  const [recentLogs, setRecentLogs] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // En una aplicación real, estos datos vendrían de la API
      // Simulamos los datos para la demostración
      
      // Estado del servidor
      setServerStatus({
        status: 'online',
        players: 42,
        maxPlayers: 70,
        map: 'The Island',
        version: 'v346.14',
        uptime: '2 días, 14 horas',
      });
      
      // Información de la tribu
      setTribeInfo({
        id: 'T12345',
        name: 'Los Supervivientes',
        members: 8,
        onlineMembers: 3,
        dinoCount: 47,
        baseLocation: '65.4, 32.8',
      });
      
      // Jugadores en línea
      setOnlinePlayers([
        { id: 1, name: 'ARKMaster99', level: 105, lastSeen: 'Ahora' },
        { id: 2, name: 'DinoHunter42', level: 98, lastSeen: 'Ahora' },
        { id: 3, name: 'SurvivalKing', level: 112, lastSeen: 'Ahora' },
      ]);
      
      // Logs recientes
      setRecentLogs([
        { id: 1, time: '10:23', message: 'Tu Rex nivel 150 mató a un Parasaur nivel 20' },
        { id: 2, time: '09:45', message: 'DinoHunter42 ha depositado 200 Metal en el almacén' },
        { id: 3, time: '08:30', message: 'SurvivalKing ha domesticado un Argentavis nivel 145' },
        { id: 4, time: '07:15', message: 'Tu tribu ha sido atacada por un Giganotosaurus salvaje' },
      ]);
      
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  return (
    <Container>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.primary]}
            tintColor={theme.primary}
            progressBackgroundColor={theme.background.card}
          />
        }
      >
        {/* Encabezado */}
        <View style={styles.header}>
          <View>
            <Text variant="h4" color="primary">Ferox PVP</Text>
            <Text color="secondary">Bienvenido, Superviviente</Text>
          </View>
          <Image 
            source={require('../../assets/icon.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        
        {/* Estado del Servidor */}
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Text variant="h5">Estado del Servidor</Text>
            <StatusBadge status={serverStatus?.status || 'offline'} />
          </View>
          
          {serverStatus ? (
            <View style={styles.serverInfo}>
              <View style={styles.infoRow}>
                <Text color="secondary">Jugadores:</Text>
                <Text>{serverStatus.players}/{serverStatus.maxPlayers}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text color="secondary">Mapa:</Text>
                <Text>{serverStatus.map}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text color="secondary">Versión:</Text>
                <Text>{serverStatus.version}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text color="secondary">Tiempo activo:</Text>
                <Text>{serverStatus.uptime}</Text>
              </View>
              
              <Button
                title="Ver Información del Servidor"
                onPress={() => navigation.navigate('ServerInfo')}
                variant="secondary"
                size="small"
                style={styles.button}
              />
            </View>
          ) : (
            <Text color="secondary">Cargando información del servidor...</Text>
          )}
        </Card>
        
        {/* Información de la Tribu */}
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Text variant="h5">Mi Tribu</Text>
            <Text color="accent">{tribeInfo?.name || 'Cargando...'}</Text>
          </View>
          
          {tribeInfo ? (
            <View style={styles.tribeInfo}>
              <View style={styles.infoRow}>
                <Text color="secondary">Miembros:</Text>
                <Text>{tribeInfo.members} ({tribeInfo.onlineMembers} en línea)</Text>
              </View>
              <View style={styles.infoRow}>
                <Text color="secondary">Dinosaurios:</Text>
                <Text>{tribeInfo.dinoCount}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text color="secondary">Ubicación:</Text>
                <Text>{tribeInfo.baseLocation}</Text>
              </View>
              
              <View style={styles.buttonGroup}>
                <Button
                  title="Ver Miembros"
                  onPress={() => navigation.navigate('TribeMembers')}
                  variant="primary"
                  size="small"
                  style={[styles.button, styles.buttonHalf]}
                />
                <Button
                  title="Ver Dinosaurios"
                  onPress={() => navigation.navigate('TribeDinos')}
                  variant="secondary"
                  size="small"
                  style={[styles.button, styles.buttonHalf]}
                />
              </View>
            </View>
          ) : (
            <Text color="secondary">Cargando información de la tribu...</Text>
          )}
        </Card>
        
        {/* Jugadores en línea */}
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Text variant="h5">Miembros En Línea</Text>
            <Text color="accent">{onlinePlayers.length} jugadores</Text>
          </View>
          
          {onlinePlayers.length > 0 ? (
            <View>
              {onlinePlayers.map(player => (
                <View key={player.id} style={styles.playerItem}>
                  <View style={styles.playerInfo}>
                    <Ionicons name="person" size={20} color={theme.primary} />
                    <Text style={styles.playerName}>{player.name}</Text>
                  </View>
                  <Text color="secondary">Nivel {player.level}</Text>
                </View>
              ))}
              
              <Button
                title="Ver Todos los Miembros"
                onPress={() => navigation.navigate('TribeMembers')}
                variant="accent"
                size="small"
                style={styles.button}
              />
            </View>
          ) : (
            <Text color="secondary">No hay miembros en línea</Text>
          )}
        </Card>
        
        {/* Logs recientes */}
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Text variant="h5">Actividad Reciente</Text>
            <Button
              title="Ver Todo"
              onPress={() => navigation.navigate('TribeLog')}
              variant="accent"
              size="small"
              outline
            />
          </View>
          
          {recentLogs.length > 0 ? (
            <View>
              {recentLogs.map(log => (
                <View key={log.id} style={styles.logItem}>
                  <Text color="accent" style={styles.logTime}>{log.time}</Text>
                  <Text style={styles.logMessage}>{log.message}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text color="secondary">No hay actividad reciente</Text>
          )}
        </Card>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 50,
    height: 50,
  },
  card: {
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  serverInfo: {
    marginTop: 8,
  },
  tribeInfo: {
    marginTop: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  button: {
    marginTop: 12,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  buttonHalf: {
    width: '48%',
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerName: {
    marginLeft: 8,
  },
  logItem: {
    marginBottom: 10,
  },
  logTime: {
    fontSize: 12,
    marginBottom: 2,
  },
  logMessage: {
    fontSize: 14,
  },
});

export default HomeScreen; 