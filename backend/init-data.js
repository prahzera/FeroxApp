const fs = require('fs');
const path = require('path');

// Crear directorio de datos si no existe
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  console.log('Creando directorio de datos...');
  fs.mkdirSync(dataDir);
}

// Inicializar archivo de usuarios
const usersPath = path.join(dataDir, 'users.json');
if (!fs.existsSync(usersPath)) {
  console.log('Creando archivo de usuarios...');
  const initialUsers = [
    {
      id: '1',
      name: 'Usuario Demo',
      email: 'demo@example.com',
      password: 'password123', // En producción, esto debería estar encriptado
      date: new Date()
    }
  ];
  fs.writeFileSync(usersPath, JSON.stringify(initialUsers, null, 2));
}

console.log('Inicialización de datos completada.'); 