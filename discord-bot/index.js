const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
require('dotenv').config();

// Configuración del cliente de Discord
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// URL de la API del backend
const API_URL = process.env.API_URL;

// Definir el comando /app
const appCommand = new SlashCommandBuilder()
  .setName('app')
  .setDescription('Vincula tu cuenta de Discord con FeroxApp')
  .addStringOption(option =>
    option.setName('codigo')
      .setDescription('El código de activación de tu cuenta de FeroxApp')
      .setRequired(true)
  );

// Registrar los comandos slash
const registerCommands = async () => {
  try {
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
    console.log('Registrando comandos slash...');

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: [appCommand.toJSON()] }
    );

    console.log('Comandos slash registrados correctamente');
  } catch (error) {
    console.error('Error al registrar los comandos slash:', error);
  }
};

// Evento cuando el bot está listo
client.once('ready', () => {
  console.log(`Bot conectado como ${client.user.tag}`);
  registerCommands();
});

// Manejar los comandos slash
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'app') {
    const activationCode = interaction.options.getString('codigo');

    try {
      // Responder inmediatamente para evitar el timeout
      await interaction.deferReply({ ephemeral: true });

      // Obtener datos del usuario de Discord
      const discordUser = {
        id: interaction.user.id,
        username: interaction.user.username,
        avatar: interaction.user.avatar ? `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png` : null
      };

      // Llamar a la API para vincular la cuenta
      const response = await axios.post(`${API_URL}/discord/link`, {
        activationCode,
        discordUser
      });

      // Responder al usuario
      await interaction.editReply({
        content: `¡Cuenta vinculada correctamente! Bienvenido, ${response.data.username || 'usuario'}.`,
        ephemeral: true
      });
    } catch (error) {
      console.error('Error al vincular la cuenta:', error.response?.data || error.message);
      
      // Mensaje de error personalizado según el código de estado
      let errorMessage = 'Ocurrió un error al vincular tu cuenta.';
      
      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = 'El código de activación no es válido o ya ha sido utilizado.';
        } else if (error.response.status === 409) {
          errorMessage = 'Esta cuenta de Discord ya está vinculada a otra cuenta.';
        } else if (error.response.data && error.response.data.msg) {
          errorMessage = error.response.data.msg;
        }
      }
      
      await interaction.editReply({
        content: errorMessage,
        ephemeral: true
      });
    }
  }
});

// Iniciar sesión en Discord
client.login(process.env.DISCORD_TOKEN); 