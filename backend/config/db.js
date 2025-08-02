const mysql = require('mysql2/promise');

// Configuración de la conexión a MySQL
const dbConfig = {
  host: '104.234.224.206',
  port: 3306,
  user: 'dev',
  password: 'Codito12',
  database: 'ferox-app'
};

// Crear un pool de conexiones
const pool = mysql.createPool(dbConfig);

// Función para probar la conexión
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Conexión a MySQL establecida correctamente');
    connection.release();
    return true;
  } catch (error) {
    console.error('Error al conectar a MySQL:', error.message);
    return false;
  }
};

module.exports = {
  pool,
  testConnection
};