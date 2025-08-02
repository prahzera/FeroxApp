import React, { createContext, useContext } from 'react';
import darkTheme from './theme';

// Crear el contexto del tema
const ThemeContext = createContext(darkTheme);

// Hook personalizado para usar el tema
export const useTheme = () => useContext(ThemeContext);

// Proveedor del tema
export const ThemeProvider = ({ children }) => {
  // Siempre usamos el tema oscuro como se solicitó
  const theme = darkTheme;
  
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext; 