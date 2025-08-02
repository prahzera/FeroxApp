# Bot de Discord para FeroxApp

Este bot permite a los usuarios vincular sus cuentas de FeroxApp con Discord usando el comando `/app`.

## Configuración

1. Crea una aplicación y un bot en el [Portal de Desarrolladores de Discord](https://discord.com/developers/applications)
2. Copia el token del bot y el ID de la aplicación
3. Crea un archivo `.env` basado en el archivo `.env.example` y completa los valores:
   ```
   DISCORD_TOKEN=tu_token_de_discord_aqui
   CLIENT_ID=tu_client_id_aqui
   API_URL=http://localhost:5000/api
   ```

## Instalación

```bash
npm install
```

## Ejecución

```bash
# Modo desarrollo
npm run dev

# Modo producción
npm start
```

## Funcionalidades

- Comando `/app codigo:ABC123` - Vincula la cuenta de Discord del usuario con su cuenta de FeroxApp usando el código de activación

## Integración con el Backend

El bot se comunica con el backend de FeroxApp para vincular las cuentas. Cuando un usuario utiliza el comando `/app` con un código de activación válido, el bot envía los siguientes datos al backend:

- ID de Discord del usuario
- Nombre de usuario de Discord
- Avatar de Discord (URL)

El backend verifica el código de activación y vincula la cuenta de Discord con la cuenta de FeroxApp correspondiente. 