import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  ActivityIndicator, 
  RefreshControl,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../utils/ThemeContext';
import Container from '../../components/Container';
import Text from '../../components/Text';
import Card from '../../components/Card';
import { tribeService } from '../../services/api';

const TribeLogScreen = () => {
  const theme = useTheme();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState('all'); // all, combat, taming, building, tribe

  useEffect(() => {
    fetchLogs();
  }, [filter]);

  const fetchLogs = async (refresh = false) => {
    if (refresh) {
      setPage(1);
      setHasMore(true);
    }

    if (!hasMore && !refresh) return;

    setLoading(true);
    try {
      // En una aplicación real, estos datos vendrían de la API
      // Simulamos los datos para la demostración
      
      // Simulamos diferentes tipos de logs
      const mockLogs = [
        { 
          id: '1', 
          timestamp: '2023-08-10T10:23:00Z', 
          time: '10:23', 
          date: '10/08/2023',
          message: 'Tu Rex nivel 150 mató a un Parasaur nivel 20', 
          type: 'combat',
          icon: 'skull'
        },
        { 
          id: '2', 
          timestamp: '2023-08-10T09:45:00Z', 
          time: '09:45', 
          date: '10/08/2023',
          message: 'DinoHunter42 ha sido expulsado de la tribu', 
          type: 'tribe',
          icon: 'archive'
        },
        { 
          id: '3', 
          timestamp: '2023-08-10T08:30:00Z', 
          time: '08:30', 
          date: '10/08/2023',
          message: 'SurvivalKing ha domesticado un Argentavis nivel 145', 
          type: 'taming',
          icon: 'paw'
        },
        { 
          id: '4', 
          timestamp: '2023-08-10T07:15:00Z', 
          time: '07:15', 
          date: '10/08/2023',
          message: 'Tu tribu ha sido atacada por un Giganotosaurus lvl 100', 
          type: 'combat',
          icon: 'warning'
        },
        { 
          id: '5', 
          timestamp: '2023-08-09T22:10:00Z', 
          time: '22:10', 
          date: '09/08/2023',
          message: 'RaptorTamer ha destruido una Fundación de Metal', 
          type: 'building',
          icon: 'construct'
        },
        { 
          id: '6', 
          timestamp: '2023-08-09T20:45:00Z', 
          time: '20:45', 
          date: '09/08/2023',
          message: 'MetalFarmer ha muerto por un Raptor nivel 30', 
          type: 'combat',
          icon: 'skull'
        },
        { 
          id: '7', 
          timestamp: '2023-08-09T18:30:00Z', 
          time: '18:30', 
          date: '09/08/2023',
          message: 'ARKMaster99 ha invitado a NewPlayer123 a la tribu', 
          type: 'tribe',
          icon: 'people'
        },
        { 
          id: '8', 
          timestamp: '2023-08-09T16:15:00Z', 
          time: '16:15', 
          date: '09/08/2023',
          message: 'DinoHunter42 ha domesticado un Doedicurus nivel 100', 
          type: 'taming',
          icon: 'paw'
        },
        { 
          id: '9', 
          timestamp: '2023-08-09T14:20:00Z', 
          time: '14:20', 
          date: '09/08/2023',
          message: 'SurvivalKing ha construido un Generador Eléctrico', 
          type: 'building',
          icon: 'construct'
        },
        { 
          id: '10', 
          timestamp: '2023-08-09T12:05:00Z', 
          time: '12:05', 
          date: '09/08/2023',
          message: 'Cocomaster123 ha sido expulsado de la tribu', 
          type: 'tribe',
          icon: 'swap-horizontal'
        },
      ];
      
      // Filtramos los logs según el filtro seleccionado
      let filteredLogs = mockLogs;
      if (filter !== 'all') {
        filteredLogs = mockLogs.filter(log => log.type === filter);
      }
      
      // Simulamos paginación
      const newLogs = filteredLogs.slice((page - 1) * 5, page * 5);
      
      if (refresh || page === 1) {
        setLogs(newLogs);
      } else {
        setLogs(prevLogs => [...prevLogs, ...newLogs]);
      }
      
      // Verificamos si hay más logs para cargar
      setHasMore(page * 5 < filteredLogs.length);
      
      if (!refresh) {
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      console.error('Error al cargar logs:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchLogs(true);
  };

  const renderLogItem = ({ item, index }) => {
    // Verificamos si este log es el primero de su fecha
    const showDateHeader = index === 0 || 
      item.date !== logs[index - 1].date;
    
    return (
      <>
        {showDateHeader && (
          <View style={styles.dateHeader}>
            <Text color="accent" bold>{item.date}</Text>
            <View style={styles.dateLine} />
          </View>
        )}
        <Card style={styles.logItem}>
          <View style={styles.logHeader}>
            <View style={styles.logTimeContainer}>
              <Ionicons 
                name={item.icon} 
                size={16} 
                color={getIconColor(item.type)} 
              />
              <Text color="accent" style={styles.logTime}>{item.time}</Text>
            </View>
            <View style={[
              styles.logTypeBadge,
              { backgroundColor: getTypeColor(item.type) }
            ]}>
              <Text style={styles.logTypeText}>{getTypeLabel(item.type)}</Text>
            </View>
          </View>
          <Text style={styles.logMessage}>{item.message}</Text>
        </Card>
      </>
    );
  };

  const getIconColor = (type) => {
    switch (type) {
      case 'combat':
        return theme.text.error;
      case 'taming':
        return theme.text.success;
      case 'building':
        return theme.secondary;
      case 'tribe':
        return theme.primary;
      default:
        return theme.text.secondary;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'combat':
        return 'rgba(244, 67, 54, 0.2)'; // Rojo con transparencia
      case 'taming':
        return 'rgba(76, 175, 80, 0.2)'; // Verde con transparencia
      case 'building':
        return 'rgba(138, 43, 226, 0.2)'; // Violeta con transparencia
      case 'tribe':
        return 'rgba(0, 191, 255, 0.2)'; // Azul con transparencia
      default:
        return 'rgba(158, 158, 158, 0.2)'; // Gris con transparencia
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'combat':
        return 'Combate';
      case 'taming':
        return 'Doma';
      case 'building':
        return 'Construcción';
      case 'tribe':
        return 'Tribu';
      default:
        return 'General';
    }
  };

  const renderFilterOption = (filterType, label) => (
    <TouchableOpacity
      style={[
        styles.filterOption,
        filter === filterType && { 
          backgroundColor: theme.background.card,
          borderColor: theme.primary,
        }
      ]}
      onPress={() => setFilter(filterType)}
    >
      <Text 
        color={filter === filterType ? 'primary' : 'secondary'}
        style={styles.filterText}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Container>
      {/* Filtros */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {renderFilterOption('all', 'Todos')}
          {renderFilterOption('combat', 'Combate')}
          {renderFilterOption('taming', 'Doma')}
          {renderFilterOption('building', 'Construcción')}
          {renderFilterOption('tribe', 'Tribu')}
        </ScrollView>
      </View>
      
      {/* Lista de logs */}
      <FlatList
        data={logs}
        renderItem={renderLogItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.primary]}
            tintColor={theme.primary}
            progressBackgroundColor={theme.background.card}
          />
        }
        onEndReached={() => fetchLogs()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && !refreshing ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="small" color={theme.primary} />
            </View>
          ) : null
        }
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyContainer}>
              <Ionicons 
                name="document-text-outline" 
                size={60} 
                color={theme.text.secondary} 
              />
              <Text color="secondary" style={styles.emptyText}>
                No hay registros disponibles
              </Text>
            </View>
          ) : null
        }
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  filterText: {
    fontSize: 14,
  },
  listContent: {
    flexGrow: 1,
    paddingTop: 12,
    paddingBottom: 24,
  },
  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  dateLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginLeft: 12,
  },
  logItem: {
    marginBottom: 8,
    marginHorizontal: 16,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  logTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logTime: {
    fontSize: 12,
    marginLeft: 6,
  },
  logTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  logTypeText: {
    fontSize: 10,
    color: '#FFFFFF',
  },
  logMessage: {
    fontSize: 14,
  },
  loaderContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    marginTop: 12,
  },
});

export default TribeLogScreen; 