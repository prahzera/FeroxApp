import React from 'react';
import { View, FlatList, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../utils/ThemeContext';
import Text from '../../components/Text';
import Card from '../../components/Card';
import StatusBadge from '../../components/StatusBadge';

const TribeDinosScreen = () => {
  const theme = useTheme();
  
  // Datos de ejemplo para dinosaurios de la tribu
  const tribeDinos = [
    { 
      id: '1', 
      name: 'Rex Alfa', 
      species: 'T-Rex', 
      level: 150, 
      status: 'available',
      health: '10,000/10,000',
      food: '8,500/10,000',
      lastLocation: 'Base Principal'
    },
    { 
      id: '2', 
      name: 'Pteranodon Veloz', 
      species: 'Pteranodon', 
      level: 135, 
      status: 'available',
      health: '2,800/3,000',
      food: '2,000/2,500',
      lastLocation: 'Torre de Vigilancia'
    },
    { 
      id: '3', 
      name: 'Ankylo Minero', 
      species: 'Ankylosaurus', 
      level: 120, 
      status: 'taming',
      health: '4,500/5,000',
      food: '3,800/4,000',
      lastLocation: 'Montaña de Metal'
    },
    { 
      id: '4', 
      name: 'Argentavis Carga', 
      species: 'Argentavis', 
      level: 140, 
      status: 'unavailable',
      health: '0/6,000',
      food: '0/5,000',
      lastLocation: 'Zona Peligrosa'
    },
    { 
      id: '5', 
      name: 'Raptor Scout', 
      species: 'Raptor', 
      level: 95, 
      status: 'breeding',
      health: '2,200/2,200',
      food: '1,800/2,000',
      lastLocation: 'Área de Crianza'
    },
  ];
  
  const getStatusInfo = (status) => {
    switch(status) {
      case 'available':
        return { label: 'Disponible', color: 'online' };
      case 'taming':
        return { label: 'Domando', color: 'warning' };
      case 'breeding':
        return { label: 'Criando', color: 'info' };
      case 'unavailable':
        return { label: 'Muerto', color: 'offline' };
      default:
        return { label: 'Desconocido', color: 'offline' };
    }
  };
  
  const renderDino = ({ item }) => {
    const statusInfo = getStatusInfo(item.status);
    
    return (
      <Card style={styles.dinoCard}>
        <View style={styles.dinoHeader}>
          <Text style={styles.dinoName}>{item.name}</Text>
          <StatusBadge 
            status={statusInfo.color}
            text={statusInfo.label} 
          />
        </View>
        
        <View style={styles.dinoDetails}>
          <Text>Especie: <Text style={styles.highlight}>{item.species}</Text></Text>
          <Text>Nivel: <Text style={styles.highlight}>{item.level}</Text></Text>
          <Text>Salud: <Text style={styles.highlight}>{item.health}</Text></Text>
          <Text>Comida: <Text style={styles.highlight}>{item.food}</Text></Text>
          <Text>Ubicación: <Text style={styles.highlight}>{item.lastLocation}</Text></Text>
        </View>
      </Card>
    );
  };
  
  return (
    <View style={[styles.container, { backgroundColor: theme.background.primary }]}>
      <FlatList
        data={tribeDinos}
        keyExtractor={item => item.id}
        renderItem={renderDino}
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
  dinoCard: {
    marginBottom: 12,
    padding: 16,
  },
  dinoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dinoName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dinoDetails: {
    gap: 4,
  },
  highlight: {
    fontWeight: 'bold',
  },
});

export default TribeDinosScreen; 