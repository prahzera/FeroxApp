# Ferox PVP

Aplicación móvil para servidores de ARK: Survival Evolved que permite a los jugadores ver información de su tribu, jugadores conectados, tribelog y más.

## Características

- **Modo Oscuro:** Interfaz de usuario en modo oscuro para una mejor experiencia visual
- **Información de Tribu:** Ver miembros, dinosaurios y registro de actividades de tu tribu
- **Estado del Servidor:** Monitorear el estado del servidor, jugadores en línea y eventos
- **Registro de Actividades:** Consultar el tribelog con filtros por tipo de actividad
- **Perfil de Usuario:** Gestionar tu perfil y configurar notificaciones

## Estructura del Proyecto

```
FeroxApp/
├── mobile/         # Aplicación móvil con React Native y Expo
│   ├── src/
│   │   ├── screens/      # Pantallas de la aplicación
│   │   │   ├── auth/     # Pantallas de autenticación
│   │   │   ├── tribe/    # Pantallas relacionadas con la tribu
│   │   │   └── server/   # Pantallas relacionadas con el servidor
│   │   ├── components/   # Componentes reutilizables
│   │   ├── navigation/   # Configuración de navegación
│   │   ├── services/     # Servicios API y utilidades
│   │   └── utils/        # Utilidades y tema
│   └── App.js            # Punto de entrada de la aplicación
│
└── backend/        # Servidor backend con Node.js y Express
    ├── data/            # Archivos JSON para almacenamiento de datos
    ├── models/          # Modelos de datos (basados en JSON)
    ├── controllers/     # Controladores de la API
    ├── routes/          # Rutas de la API
    ├── config/          # Configuraciones
    └── server.js        # Punto de entrada del servidor
```

## Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn
- Expo CLI (`npm install -g expo-cli`)

## Configuración del Backend

1. Navega a la carpeta del backend:
   ```
   cd FeroxApp/backend
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Inicializa los datos:
   ```
   npm run init-data
   ```

4. Crea un archivo `.env` en la carpeta backend con las siguientes variables:
   ```
   PORT=5000
   NODE_ENV=development
   ```

5. Inicia el servidor:
   ```
   npm run dev
   ```

## Configuración de la Aplicación Móvil

1. Navega a la carpeta de la aplicación móvil:
   ```
   cd FeroxApp/mobile
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Actualiza la URL de la API en `src/services/api.js` con la dirección IP de tu máquina local:
   ```javascript
   const API_URL = 'http://TU_DIRECCION_IP:5000';
   ```

4. Coloca tu icono personalizado en `assets/icon.png`

5. Inicia la aplicación:
   ```
   npm start
   ```

6. Escanea el código QR con la aplicación Expo Go en tu dispositivo o utiliza un emulador.

## Pantallas Principales

- **Login/Registro:** Autenticación de usuarios
- **Home:** Resumen general con información del servidor y la tribu
- **Tribe:** Información detallada de la tribu, miembros y dinosaurios
- **Server:** Estado del servidor, jugadores en línea y reglas
- **Profile:** Perfil del usuario y configuración de notificaciones
- **TribeLog:** Registro de actividades de la tribu con filtros

## Tecnologías Utilizadas

### Frontend
- React Native
- Expo
- React Navigation
- Axios

### Backend
- Node.js
- Express
- Almacenamiento JSON (con planes futuros para migrar a MySQL)

## Personalización

La aplicación está diseñada para ser fácilmente personalizable:

- **Tema:** Modifica los colores y estilos en `src/utils/theme.js`
- **API:** Actualiza los endpoints en `src/services/api.js`
- **Iconos:** La aplicación utiliza Ionicons de Expo

## Notas

- Esta es una versión inicial que puede ser expandida con más características
- El backend incluido es un esqueleto básico que debe ser adaptado para conectarse a tu servidor de ARK
- Para un uso en producción, se recomienda implementar medidas de seguridad adicionales
- Actualmente los datos se almacenan en archivos JSON, pero está planificada una migración a MySQL 