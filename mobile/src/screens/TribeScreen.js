import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../utils/ThemeContext';
import Container from '../components/Container';
import Text from '../components/Text';
import Card from '../components/Card';
import Button from '../components/Button';
import StatusBadge from '../components/StatusBadge';
import { tribeService } from '../services/api';

const TribeScreen = ({ navigation }) => {
  const theme = useTheme();
  const [tribeInfo, setTribeInfo] = useState(null);
  const [tribeMembers, setTribeMembers] = useState([]);
  const [tribeDinos, setTribeDinos] = useState([]);
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
      
      // Información de la tribu
      setTribeInfo({
        id: 'T12345',
        name: 'Los Supervivientes',
        owner: 'ARKMaster99',
        created: '15/06/2023',
        members: 8,
        onlineMembers: 3,
        dinoCount: 47,
        baseLocation: '65.4, 32.8',
        alliance: 'Los Conquistadores',
      });
      
      // Miembros de la tribu
      setTribeMembers([
        { id: 1, name: 'ARKMaster99', level: 105, role: 'Líder', status: 'online', lastSeen: 'Ahora' },
        { id: 2, name: 'DinoHunter42', level: 98, role: 'Administrador', status: 'online', lastSeen: 'Ahora' },
        { id: 3, name: 'SurvivalKing', level: 112, role: 'Administrador', status: 'online', lastSeen: 'Ahora' },
        { id: 4, name: 'RaptorTamer', level: 87, role: 'Miembro', status: 'offline', lastSeen: '2 horas' },
        { id: 5, name: 'MetalFarmer', level: 76, role: 'Miembro', status: 'offline', lastSeen: '5 horas' },
      ]);
      
      // Dinosaurios de la tribu (muestra solo algunos)
      setTribeDinos([
        { id: 1, name: 'Destructor', type: 'Rex', level: 223, status: 'disponible' },
        { id: 2, name: 'Volador', type: 'Pteranodon', level: 187, status: 'disponible' },
        { id: 3, name: 'Tanque', type: 'Bronto', level: 156, status: 'disponible' },
        { id: 4, name: 'Recolector', type: 'Ankylo', level: 145, status: 'disponible' },
        { id: 5, name: 'Nadador', type: 'Megalodon', level: 134, status: 'disponible' },
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
        {/* Encabezado de la tribu */}
        <Card style={styles.headerCard}>
          {tribeInfo ? (
            <View>
              <Text variant="h3" color="primary" style={styles.tribeName}>
                {tribeInfo.name}
              </Text>
              <View style={styles.tribeStats}>
                <View style={styles.statItem}>
                  <Ionicons name="people" size={20} color={theme.primary} />
                  <Text style={styles.statText}>{tribeInfo.members} miembros</Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="paw" size={20} color={theme.secondary} />
                  <Text style={styles.statText}>{tribeInfo.dinoCount} dinos</Text>
                </View>
              </View>
              <View style={styles.divider} />
              <View style={styles.infoRow}>
                <Text color="secondary">Líder:</Text>
                <Text>{tribeInfo.owner}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text color="secondary">Creada:</Text>
                <Text>{tribeInfo.created}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text color="secondary">Ubicación:</Text>
                <Text>{tribeInfo.baseLocation}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text color="secondary">Alianza:</Text>
                <Text>{tribeInfo.alliance || 'Ninguna'}</Text>
              </View>
            </View>
          ) : (
            <Text color="secondary">Cargando información de la tribu...</Text>
          )}
        </Card>
        
        {/* Miembros de la tribu */}
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Text variant="h5">Miembros</Text>
            <Button
              title="Ver Todos"
              onPress={() => navigation.navigate('TribeMembers')}
              variant="accent"
              size="small"
              outline
            />
          </View>
          
          {tribeMembers.length > 0 ? (
            <View>
              {tribeMembers.slice(0, 3).map(member => (
                <View key={member.id} style={styles.memberItem}>
                  <View style={styles.memberInfo}>
                    <StatusBadge status={member.status} size="small" />
                    <Text style={styles.memberName}>{member.name}</Text>
                  </View>
                  <View style={styles.memberDetails}>
                    <Text color="secondary" style={styles.memberRole}>{member.role}</Text>
                    <Text color="secondary">Lvl {member.level}</Text>
                  </View>
                </View>
              ))}
              
              {tribeMembers.length > 3 && (
                <TouchableOpacity 
                  style={styles.showMore}
                  onPress={() => navigation.navigate('TribeMembers')}
                >
                  <Text color="accent">Ver {tribeMembers.length - 3} más...</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <Text color="secondary">No hay miembros en la tribu</Text>
          )}
        </Card>
        
        {/* Dinosaurios de la tribu */}
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Text variant="h5">Dinosaurios</Text>
            <Button
              title="Ver Todos"
              onPress={() => navigation.navigate('TribeDinos')}
              variant="accent"
              size="small"
              outline
            />
          </View>
          
          {tribeDinos.length > 0 ? (
            <View>
              {tribeDinos.slice(0, 3).map(dino => (
                <View key={dino.id} style={styles.dinoItem}>
                  <View style={styles.dinoInfo}>
                    <Text style={styles.dinoName}>{dino.name}</Text>
                    <Text color="secondary" style={styles.dinoType}>{dino.type}</Text>
                  </View>
                  <Text color="secondary">Lvl {dino.level}</Text>
                </View>
              ))}
              
              {tribeDinos.length > 3 && (
                <TouchableOpacity 
                  style={styles.showMore}
                  onPress={() => navigation.navigate('TribeDinos')}
                >
                  <Text color="accent">Ver {tribeDinos.length - 3} más...</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <Text color="secondary">No hay dinosaurios en la tribu</Text>
          )}
        </Card>
        
        {/* Botones de acción */}
        <View style={styles.actionButtons}>
          <Button
            title="Ver Registro de Tribu"
            onPress={() => navigation.navigate('TribeLog')}
            style={styles.actionButton}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  headerCard: {
    marginBottom: 16,
  },
  tribeName: {
    marginBottom: 8,
  },
  tribeStats: {
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
  card: {
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  memberItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberName: {
    marginLeft: 8,
  },
  memberDetails: {
    alignItems: 'flex-end',
  },
  memberRole: {
    fontSize: 12,
    marginBottom: 2,
  },
  dinoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  dinoInfo: {
    flexDirection: 'column',
  },
  dinoName: {
    marginBottom: 2,
  },
  dinoType: {
    fontSize: 12,
  },
  showMore: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  actionButtons: {
    marginTop: 8,
    marginBottom: 24,
  },
  actionButton: {
    marginBottom: 12,
  },
});

export default TribeScreen; 