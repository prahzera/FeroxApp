import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../utils/ThemeContext';
import Container from '../components/Container';
import Text from '../components/Text';
import Card from '../components/Card';
import Button from '../components/Button';
import StatusBadge from '../components/StatusBadge';
import { serverService } from '../services/api';

const ServerScreen = ({ navigation }) => {
  const theme = useTheme();
  const [serverInfo, setServerInfo] = useState(null);
  const [onlinePlayers, setOnlinePlayers] = useState([]);
  const [serverRules, setServerRules] = useState([]);
  const [events, setEvents] = useState([]);
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
      
      // Información del servidor
      setServerInfo({
        name: 'ARK Survival Evolved - PVE',
        status: 'online',
        version: 'v346.14',
        map: 'The Island',
        players: 42,
        maxPlayers: 70,
        uptime: '2 días, 14 horas',
        ip: '192.168.1.100',
        port: '27015',
        lastWipe: '01/07/2023',
        nextWipe: 'No programado',
      });
      
      // Jugadores en línea (muestra solo algunos)
      setOnlinePlayers([
        { id: 1, name: 'ARKMaster99', tribe: 'Los Supervivientes', level: 105 },
        { id: 2, name: 'DinoHunter42', tribe: 'Los Supervivientes', level: 98 },
        { id: 3, name: 'SurvivalKing', tribe: 'Los Supervivientes', level: 112 },
        { id: 4, name: 'AlphaRex', tribe: 'Domadores', level: 120 },
        { id: 5, name: 'MetalFarmer2000', tribe: 'Constructores', level: 95 },
        { id: 6, name: 'DinoQueen', tribe: 'Domadores', level: 110 },
        { id: 7, name: 'BuildMaster', tribe: 'Constructores', level: 102 },
        { id: 8, name: 'RaptorTamer', tribe: 'Cazadores', level: 87 },
      ]);
      
      // Reglas del servidor
      setServerRules([
        { id: 1, rule: 'No bloquear recursos importantes' },
        { id: 2, rule: 'No construir cerca de otros jugadores sin permiso' },
        { id: 3, rule: 'No matar dinosaurios pasivos de otros jugadores' },
        { id: 4, rule: 'Respetar las zonas de construcción' },
        { id: 5, rule: 'Máximo 50 dinosaurios por tribu' },
      ]);
      
      // Eventos programados
      setEvents([
        { 
          id: 1, 
          name: 'Caza del Alpha Rex', 
          date: '15/08/2023', 
          time: '20:00', 
          description: 'Evento de caza del Alpha Rex en la zona norte del mapa' 
        },
        { 
          id: 2, 
          name: 'Carrera de Pteranodones', 
          date: '20/08/2023', 
          time: '18:00', 
          description: 'Carrera de Pteranodones alrededor de la montaña central' 
        },
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
        {/* Información del servidor */}
        <Card style={styles.headerCard}>
          {serverInfo ? (
            <View>
              <View style={styles.serverHeader}>
                <Text variant="h4" color="primary" style={styles.serverName}>
                  {serverInfo.name}
                </Text>
                <StatusBadge status={serverInfo.status} />
              </View>
              
              <View style={styles.serverStats}>
                <View style={styles.statItem}>
                  <Ionicons name="people" size={20} color={theme.primary} />
                  <Text style={styles.statText}>
                    {serverInfo.players}/{serverInfo.maxPlayers}
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="map" size={20} color={theme.secondary} />
                  <Text style={styles.statText}>{serverInfo.map}</Text>
                </View>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.infoRow}>
                <Text color="secondary">Versión:</Text>
                <Text>{serverInfo.version}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text color="secondary">Tiempo activo:</Text>
                <Text>{serverInfo.uptime}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text color="secondary">IP:Puerto:</Text>
                <Text>{serverInfo.ip}:{serverInfo.port}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text color="secondary">Último wipe:</Text>
                <Text>{serverInfo.lastWipe}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text color="secondary">Próximo wipe:</Text>
                <Text>{serverInfo.nextWipe}</Text>
              </View>
              
              <Button
                title="Ver Información Completa"
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
        
        {/* Jugadores en línea */}
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Text variant="h5">Jugadores En Línea</Text>
            <Text color="accent">{onlinePlayers.length} jugadores</Text>
          </View>
          
          {onlinePlayers.length > 0 ? (
            <View>
              {onlinePlayers.slice(0, 5).map(player => (
                <View key={player.id} style={styles.playerItem}>
                  <View style={styles.playerInfo}>
                    <Ionicons name="person" size={18} color={theme.primary} />
                    <Text style={styles.playerName}>{player.name}</Text>
                  </View>
                  <View style={styles.playerDetails}>
                    <Text color="secondary" style={styles.playerTribe}>{player.tribe}</Text>
                    <Text color="secondary">Lvl {player.level}</Text>
                  </View>
                </View>
              ))}
              
              {onlinePlayers.length > 5 && (
                <TouchableOpacity style={styles.showMore}>
                  <Text color="accent">Ver {onlinePlayers.length - 5} más...</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <Text color="secondary">No hay jugadores en línea</Text>
          )}
        </Card>
        
        {/* Reglas del servidor */}
        <Card style={styles.card}>
          <Text variant="h5" style={styles.sectionTitle}>Reglas del Servidor</Text>
          
          {serverRules.length > 0 ? (
            <View style={styles.rulesList}>
              {serverRules.map(item => (
                <View key={item.id} style={styles.ruleItem}>
                  <Ionicons name="checkmark-circle" size={16} color={theme.primary} />
                  <Text style={styles.ruleText}>{item.rule}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text color="secondary">No hay reglas establecidas</Text>
          )}
        </Card>
        
        {/* Eventos programados */}
        <Card style={styles.card}>
          <Text variant="h5" style={styles.sectionTitle}>Próximos Eventos</Text>
          
          {events.length > 0 ? (
            <View>
              {events.map(event => (
                <View key={event.id} style={styles.eventItem}>
                  <View style={styles.eventHeader}>
                    <Text color="primary" style={styles.eventName}>{event.name}</Text>
                    <Text color="accent">{event.date} - {event.time}</Text>
                  </View>
                  <Text color="secondary" style={styles.eventDescription}>
                    {event.description}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <Text color="secondary">No hay eventos programados</Text>
          )}
        </Card>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  headerCard: {
    marginBottom: 16,
  },
  serverHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  serverName: {
    flex: 1,
    marginRight: 8,
  },
  serverStats: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    marginLeft: 6,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
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
  sectionTitle: {
    marginBottom: 12,
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
  playerDetails: {
    alignItems: 'flex-end',
  },
  playerTribe: {
    fontSize: 12,
    marginBottom: 2,
  },
  showMore: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  rulesList: {
    marginTop: 4,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  ruleText: {
    marginLeft: 8,
    flex: 1,
  },
  eventItem: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventName: {
    fontWeight: 'bold',
  },
  eventDescription: {
    fontSize: 14,
  },
});

export default ServerScreen; 