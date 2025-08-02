# Backend de FeroxApp

Este es el backend de FeroxApp, que utiliza un sistema de almacenamiento basado en archivos JSON para guardar los datos de la aplicación.

## Estructura de Datos

Los datos se almacenan en archivos JSON en el directorio `data`:
- `users.json`: Contiene la información de los usuarios

## Configuración

1. Instala las dependencias:
```
npm install
```

2. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```
PORT=5000
```

## Ejecución

Para ejecutar el servidor en modo desarrollo:
```
npm run dev
```

Para ejecutar el servidor en modo producción:
```
npm start
```

## API Endpoints

### Usuarios

- `GET /api/users`: Obtiene todos los usuarios
- `GET /api/users/:id`: Obtiene un usuario por ID
- `POST /api/users`: Crea un nuevo usuario

## Notas

Este backend utiliza archivos JSON para almacenar datos temporalmente. En el futuro, se migrará a MySQL para un almacenamiento más robusto y escalable. 