const fs = require('fs');
const path = require('path');
const { pool, testConnection } = require('./config/db');
const bcrypt = require('bcryptjs');

// Función para ejecutar el archivo SQL
async function executeSqlFile(filePath) {
  try {
    const sql = fs.readFileSync(filePath, 'utf8');
    
    // Dividir el archivo en instrucciones SQL individuales
    const statements = sql.split(';').filter(statement => statement.trim());
    
    // Ejecutar cada instrucción
    for (const statement of statements) {
      if (statement.trim()) {
        await pool.query(statement);
      }
    }
    
    console.log(`Archivo SQL ejecutado correctamente: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`Error al ejecutar archivo SQL ${filePath}:`, error);
    throw error;
  }
}

// Función para inicializar la base de datos
async function initDatabase() {
  try {
    // Probar la conexión a la base de datos
    const isConnected = await testConnection();
    
    if (!isConnected) {
      console.error('No se pudo conectar a la base de datos. Abortando inicialización.');
      process.exit(1);
    }
    
    // Ejecutar script de creación de tablas
    const sqlFilePath = path.join(__dirname, 'sql', 'create_users_table.sql');
    await executeSqlFile(sqlFilePath);
    
    // Verificar si ya existe el usuario admin
    const [existingUsers] = await pool.query('SELECT * FROM users WHERE username = ?', ['Prah']);
    
    // Si no existe el usuario admin, crearlo
    if (existingUsers.length === 0) {
      // Generar hash de la contraseña
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash('admin', salt);
      
      // Insertar usuario admin
      await pool.query(`
        INSERT INTO users 
        (id, username, password, isActive, discordId, discordUsername, discordAvatar, createdAt) 
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
      `, [
        Date.now().toString(),
        'Prah',
        hashedPassword,
        true,
        '264163063291314176',
        'prahzera',
        'https://cdn.discordapp.com/avatars/264163063291314176/a_fdaca95f3a49c0600d281e65003a0879.png'
      ]);
      
      console.log('Usuario admin creado correctamente');
    } else {
      console.log('El usuario admin ya existe');
    }
    
    console.log('Base de datos inicializada correctamente');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    process.exit(1);
  } finally {
    // Cerrar la conexión al terminar
    pool.end();
  }
}

// Ejecutar la inicialización
initDatabase();