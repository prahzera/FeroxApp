import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../utils/ThemeContext';
import Text from '../../components/Text';
import Card from '../../components/Card';
import StatusBadge from '../../components/StatusBadge';

const ServerInfoScreen = () => {
  const theme = useTheme();
  
  // Datos de ejemplo para información del servidor
  const serverInfo = {
    name: 'FeroxARK PVP x10',
    status: 'online',
    players: '32/70',
    map: 'The Island',
    version: 'v345.2',
    ip: '192.168.1.100:27015',
    uptime: '3 días, 7 horas',
    lastWipe: '15/08/2023',
    events: [
      { id: '1', name: 'Doble XP', active: true, endsIn: '2 días' },
      { id: '2', name: 'Crianza Rápida', active: false, startsIn: '3 días' }
    ],
    rules: [
      'No mesh, no exploits, no cheats',
      'Respeto entre jugadores',
      'Máximo 3 bases por tribu',
      'No bloquear recursos importantes',
      'Eventos PVP cada fin de semana'
    ]
  };
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background.primary }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Información básica del servidor */}
      <Card style={styles.card}>
        <View style={styles.headerContainer}>
          <Text style={styles.serverName}>{serverInfo.name}</Text>
          <StatusBadge 
            status={serverInfo.status === 'online' ? 'online' : 'offline'} 
            text={serverInfo.status === 'online' ? 'En línea' : 'Desconectado'} 
          />
        </View>
        
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Jugadores:</Text>
            <Text style={styles.infoValue}>{serverInfo.players}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Mapa:</Text>
            <Text style={styles.infoValue}>{serverInfo.map}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Versión:</Text>
            <Text style={styles.infoValue}>{serverInfo.version}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>IP:</Text>
            <Text style={styles.infoValue}>{serverInfo.ip}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Tiempo activo:</Text>
            <Text style={styles.infoValue}>{serverInfo.uptime}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Último wipe:</Text>
            <Text style={styles.infoValue}>{serverInfo.lastWipe}</Text>
          </View>
        </View>
      </Card>
      
      {/* Eventos del servidor */}
      <Text style={styles.sectionTitle}>Eventos</Text>
      <Card style={styles.card}>
        {serverInfo.events.map(event => (
          <View key={event.id} style={styles.eventItem}>
            <Text style={styles.eventName}>{event.name}</Text>
            <View style={styles.eventStatus}>
              <StatusBadge 
                status={event.active ? 'online' : 'info'} 
                text={event.active ? 'Activo' : 'Próximamente'} 
              />
              <Text style={styles.eventTime}>
                {event.active ? `Termina en: ${event.endsIn}` : `Comienza en: ${event.startsIn}`}
              </Text>
            </View>
          </View>
        ))}
      </Card>
      
      {/* Reglas del servidor */}
      <Text style={styles.sectionTitle}>Reglas</Text>
      <Card style={styles.card}>
        {serverInfo.rules.map((rule, index) => (
          <View key={index} style={styles.ruleItem}>
            <Text style={styles.ruleNumber}>{index + 1}.</Text>
            <Text style={styles.ruleText}>{rule}</Text>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  serverName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  infoItem: {
    width: '50%',
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 4,
  },
  eventItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  eventName: {
    fontSize: 16,
    fontWeight: '500',
  },
  eventStatus: {
    alignItems: 'flex-end',
  },
  eventTime: {
    fontSize: 12,
    marginTop: 4,
    opacity: 0.7,
  },
  ruleItem: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  ruleNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
    width: 20,
  },
  ruleText: {
    fontSize: 16,
    flex: 1,
  },
});

export default ServerInfoScreen; 