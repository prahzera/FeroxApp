const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { testConnection } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
  res.send('API de FeroxApp funcionando correctamente con MySQL');
});

// Importar rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/discord', require('./routes/discord'));

// Probar la conexión a la base de datos y luego iniciar el servidor
(async () => {
  try {
    // Probar la conexión a MySQL
    const isConnected = await testConnection();
    
    if (!isConnected) {
      console.error('Error: No se pudo conectar a la base de datos MySQL');
      process.exit(1);
    }
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
      console.log('Conexión a MySQL establecida correctamente');
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
})(); 