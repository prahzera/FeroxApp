import axios from 'axios';

// Cambia esta URL por la IP de tu máquina local o servidor
const API_URL = 'http://192.168.100.9:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userService = {
  getUsers: async () => {
    try {
      const response = await api.get('/api/users');
      return response.data;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error;
    }
  },
  
  getUserById: async (id) => {
    try {
      const response = await api.get(`/api/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener usuario ${id}:`, error);
      throw error;
    }
  },
  
  createUser: async (userData) => {
    try {
      const response = await api.post('/api/users', userData);
      return response.data;
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  },
  
  checkUserStatus: async (userId) => {
    try {
      const response = await api.get(`/api/users/${userId}/status`);
      return response.data;
    } catch (error) {
      console.error('Error al verificar estado del usuario:', error);
      throw error;
    }
  },
  
  generateActivationCode: async (userId) => {
    try {
      const response = await api.post(`/api/users/${userId}/activation-code`);
      return response.data;
    } catch (error) {
      console.error('Error al generar código de activación:', error);
      throw error;
    }
  }
};

export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post('/api/auth/login', credentials);
      
      // Guardar el token en el header para futuras peticiones
      if (response.data.token) {
        api.defaults.headers.common['x-auth-token'] = response.data.token;
      }
      
      return response.data;
    } catch (error) {
      // Manejo más elegante del error
      let errorMessage = 'No se pudo iniciar sesión. Por favor, verifica tus credenciales.';
      
      // Si hay un mensaje específico del servidor, usarlo
      if (error.response && error.response.data && error.response.data.msg) {
        errorMessage = error.response.data.msg;
      }
      
      // Crear un objeto de error personalizado
      const customError = new Error(errorMessage);
      customError.response = error.response;
      
      throw customError;
    }
  },
  
  register: async (userData) => {
    try {
      const response = await api.post('/api/users', userData);
      return response.data;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error;
    }
  },
  
  getMe: async () => {
    try {
      const response = await api.get('/api/auth/me');
      return response.data;
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      throw error;
    }
  },
  
  logout: () => {
    // Eliminar el token de autorización
    delete api.defaults.headers.common['x-auth-token'];
  }
};

export const passwordRecoveryService = {
  recover: async (usernameOrEmail) => {
    try {
      const response = await api.post('/api/auth/recover', { usernameOrEmail });
      return response.data;
    } catch (error) {
      console.error('Error al solicitar recuperación:', error);
      throw error;
    }
  },
  validateCode: async (usernameOrEmail, code) => {
    try {
      const response = await api.post('/api/auth/validate-recovery', { usernameOrEmail, code });
      return response.data;
    } catch (error) {
      console.error('Error al validar código:', error);
      throw error;
    }
  },
  resetPassword: async (usernameOrEmail, code, newPassword) => {
    try {
      const response = await api.post('/api/auth/reset-password', { usernameOrEmail, code, newPassword });
      return response.data;
    } catch (error) {
      console.error('Error al resetear contraseña:', error);
      throw error;
    }
  }
};

export const tribeService = {
  getTribeInfo: async (tribeId) => {
    try {
      const response = await api.get(`/api/tribes/${tribeId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener información de la tribu:', error);
      throw error;
    }
  },
  
  getOnlinePlayers: async (tribeId) => {
    try {
      const response = await api.get(`/api/tribes/${tribeId}/players/online`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener jugadores conectados:', error);
      throw error;
    }
  },
  
  getTribeLog: async (tribeId, page = 1, limit = 20) => {
    try {
      const response = await api.get(`/api/tribes/${tribeId}/log?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener tribelog:', error);
      throw error;
    }
  },
  
  getTribeMembers: async (tribeId) => {
    try {
      const response = await api.get(`/api/tribes/${tribeId}/members`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener miembros de la tribu:', error);
      throw error;
    }
  },
  
  getTribeDinos: async (tribeId) => {
    try {
      const response = await api.get(`/api/tribes/${tribeId}/dinos`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener dinosaurios de la tribu:', error);
      throw error;
    }
  }
};

export const serverService = {
  getServerStatus: async () => {
    try {
      const response = await api.get('/api/server/status');
      return response.data;
    } catch (error) {
      console.error('Error al obtener estado del servidor:', error);
      throw error;
    }
  },
  
  getServerInfo: async () => {
    try {
      const response = await api.get('/api/server/info');
      return response.data;
    } catch (error) {
      console.error('Error al obtener información del servidor:', error);
      throw error;
    }
  }
};

export default api; 