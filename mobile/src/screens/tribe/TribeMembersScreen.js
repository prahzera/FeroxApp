import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../../utils/ThemeContext';
import Text from '../../components/Text';
import Card from '../../components/Card';
import StatusBadge from '../../components/StatusBadge';

const TribeMembersScreen = () => {
  const theme = useTheme();
  
  // Datos de ejemplo para miembros de la tribu
  const tribeMembers = [
    { id: '1', name: 'JugadorAlfa', rank: 'Líder', lastSeen: 'Conectado', level: 105 },
    { id: '2', name: 'GuerreroX', rank: 'Administrador', lastSeen: 'Hace 2 horas', level: 98 },
    { id: '3', name: 'CazadorPro', rank: 'Miembro', lastSeen: 'Hace 1 día', level: 87 },
    { id: '4', name: 'DinoMaster', rank: 'Miembro', lastSeen: 'Hace 3 días', level: 92 },
    { id: '5', name: 'ConstructorZ', rank: 'Miembro', lastSeen: 'Hace 1 semana', level: 76 },
  ];
  
  const renderMember = ({ item }) => {
    const isOnline = item.lastSeen === 'Conectado';
    
    return (
      <Card style={styles.memberCard}>
        <View style={styles.memberHeader}>
          <Text style={styles.memberName}>{item.name}</Text>
          <StatusBadge 
            status={isOnline ? 'online' : 'offline'} 
            text={isOnline ? 'En línea' : 'Desconectado'} 
          />
        </View>
        
        <View style={styles.memberDetails}>
          <Text>Rango: <Text style={styles.highlight}>{item.rank}</Text></Text>
          <Text>Nivel: <Text style={styles.highlight}>{item.level}</Text></Text>
          {!isOnline && <Text>Última conexión: {item.lastSeen}</Text>}
        </View>
      </Card>
    );
  };
  
  return (
    <View style={[styles.container, { backgroundColor: theme.background.primary }]}>
      <FlatList
        data={tribeMembers}
        keyExtractor={item => item.id}
        renderItem={renderMember}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
  memberCard: {
    marginBottom: 12,
    padding: 16,
  },
  memberHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  memberName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  memberDetails: {
    gap: 4,
  },
  highlight: {
    fontWeight: 'bold',
  },
});

export default TribeMembersScreen; 