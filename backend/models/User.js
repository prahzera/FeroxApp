const crypto = require('crypto');
const { pool } = require('../config/db');

// Obtener todos los usuarios
const getAll = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

// Encontrar un usuario por ID
const findById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0] || null;
  } catch (error) {
    console.error('Error al buscar usuario por ID:', error);
    throw error;
  }
};

// Encontrar un usuario por filtros
const findOne = async (filter) => {
  try {
    let query = 'SELECT * FROM users WHERE ';
    let params = [];

    if (filter.username) {
      query += 'LOWER(username) = LOWER(?)';
      params.push(filter.username);
    } else if (filter.email) {
      query += 'email = ?';
      params.push(filter.email);
    } else if (filter.activationCode) {
      query += 'activationCode = ?';
      params.push(filter.activationCode);
    } else if (filter.discordId) {
      query += 'discordId = ?';
      params.push(filter.discordId);
    } else {
      return null;
    }

    const [rows] = await pool.query(query, params);
    return rows[0] || null;
  } catch (error) {
    console.error('Error al buscar usuario:', error);
    throw error;
  }
};

// Crear un nuevo usuario
const create = async (userData) => {
  try {
    // Generar un código de activación aleatorio
    const activationCode = crypto.randomBytes(4).toString('hex').toUpperCase();
    
    // Generar ID único basado en timestamp
    const id = Date.now().toString();
    
    const query = `
      INSERT INTO users 
      (id, username, password, email, isActive, activationCode, discordId, discordUsername, discordAvatar, createdAt) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;
    
    const params = [
      id,
      userData.username,
      userData.password,
      userData.email || null,
      false,
      activationCode,
      null,
      null,
      null
    ];
    
    await pool.query(query, params);
    
    // Devolver el usuario creado
    return await findById(id);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
};

// Actualizar un usuario
const update = async (id, updateData) => {
  try {
    // Construir la consulta dinámicamente
    let query = 'UPDATE users SET ';
    const params = [];
    const fields = [];
    
    // Agregar cada campo a actualizar
    Object.entries(updateData).forEach(([key, value]) => {
      fields.push(`${key} = ?`);
      params.push(value);
    });
    
    query += fields.join(', ');
    query += ' WHERE id = ?';
    params.push(id);
    
    // Ejecutar la actualización
    const [result] = await pool.query(query, params);
    
    if (result.affectedRows === 0) {
      return null;
    }
    
    // Devolver el usuario actualizado
    return await findById(id);
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    throw error;
  }
};

// Vincular cuenta de Discord
const linkDiscord = async (activationCode, discordData) => {
  try {
    // Buscar el usuario por código de activación
    const user = await findOne({ activationCode });
    
    if (!user) {
      return null;
    }
    
    // Actualizar con datos de Discord
    const updateData = {
      discordId: discordData.id,
      discordUsername: discordData.username,
      discordAvatar: discordData.avatar,
      isActive: true,
      activationCode: null // Eliminar el código una vez usado
    };
    
    return await update(user.id, updateData);
  } catch (error) {
    console.error('Error al vincular cuenta de Discord:', error);
    throw error;
  }
};

// Generar un nuevo código de activación
const generateNewActivationCode = async (userId) => {
  try {
    const activationCode = crypto.randomBytes(4).toString('hex').toUpperCase();
    
    const [result] = await pool.query(
      'UPDATE users SET activationCode = ? WHERE id = ?',
      [activationCode, userId]
    );
    
    if (result.affectedRows === 0) {
      return null;
    }
    
    return activationCode;
  } catch (error) {
    console.error('Error al generar código de activación:', error);
    throw error;
  }
};

// Generar un código de recuperación y expiración
const setRecoveryCode = async (userId, code, expires) => {
  try {
    const [result] = await pool.query(
      'UPDATE users SET recoveryCode = ?, recoveryCodeExpires = ? WHERE id = ?',
      [code, expires, userId]
    );
    
    if (result.affectedRows === 0) {
      return null;
    }
    
    return await findById(userId);
  } catch (error) {
    console.error('Error al establecer código de recuperación:', error);
    throw error;
  }
};

// Validar código de recuperación
const validateRecoveryCode = async (userId, code) => {
  try {
    const user = await findById(userId);
    
    if (!user || user.recoveryCode !== code) {
      return false;
    }
    
    if (new Date(user.recoveryCodeExpires) < new Date()) {
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error al validar código de recuperación:', error);
    throw error;
  }
};

module.exports = {
  getAll,
  findById,
  findOne,
  create,
  update,
  linkDiscord,
  generateNewActivationCode,
  setRecoveryCode,
  validateRecoveryCode
};