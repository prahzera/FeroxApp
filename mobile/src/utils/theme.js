export const darkTheme = {
  // Colores principales
  primary: '#00BFFF', // Azul brillante para elementos principales
  secondary: '#8A2BE2', // Violeta para elementos secundarios
  accent: '#FF5722', // Naranja para acentos
  
  // Fondos
  background: {
    primary: '#121212', // Fondo principal oscuro
    secondary: '#1E1E1E', // Fondo secundario
    card: '#252525', // Fondo para tarjetas
    elevated: '#2C2C2C', // Fondo para elementos elevados
  },
  
  // Texto
  text: {
    primary: '#FFFFFF', // Texto principal
    secondary: '#B0B0B0', // Texto secundario
    disabled: '#6E6E6E', // Texto deshabilitado
    accent: '#00BFFF', // Texto de acento
    error: '#FF5252', // Texto de error
    success: '#4CAF50', // Texto de éxito
    warning: '#FFC107', // Texto de advertencia
  },
  
  // Bordes
  border: {
    color: '#333333',
    width: 1,
  },
  
  // Estados
  status: {
    online: '#4CAF50', // Verde para online
    offline: '#F44336', // Rojo para offline
    warning: '#FF9800', // Naranja para advertencias
    neutral: '#9E9E9E', // Gris para neutral
  },
  
  // Sombras
  shadow: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 6,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12,
    },
  },
  
  // Espaciado
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  // Radios de borde
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 9999,
  },
};

export default darkTheme; 