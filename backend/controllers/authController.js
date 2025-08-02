const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');

// Iniciar sesión
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Validar datos
    if (!username || !password) {
      return res.status(400).json({ msg: 'Por favor, ingresa todos los campos' });
    }

    // Verificar si el usuario existe
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    // Verificar si la cuenta está activada
    if (!user.isActive) {
      return res.status(403).json({ 
        msg: 'Tu cuenta no está activada. Por favor, vincula tu cuenta de Discord usando el código de activación.',
        activationCode: user.activationCode,
        userId: user.id,
        isActive: false
      });
    }

    // Crear y firmar el JWT
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'secret_temporal',
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({ 
          token,
          user: {
            id: user.id,
            username: user.username,
            discordUsername: user.discordUsername,
            discordAvatar: user.discordAvatar,
            isActive: user.isActive
          }
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};

// Obtener usuario autenticado
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    
    // Crear un nuevo objeto sin la contraseña
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
}; 

// Iniciar recuperación de contraseña
exports.recoverPassword = async (req, res) => {
  const { usernameOrEmail } = req.body;
  if (!usernameOrEmail) return res.status(400).json({ msg: 'Falta usuario o email' });
  
  try {
    // Intentar buscar por username primero
    let user = await User.findOne({ username: usernameOrEmail });
    
    // Si no se encuentra, buscar por email
    if (!user) {
      user = await User.findOne({ email: usernameOrEmail });
    }
    
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });
    if (!user.discordId) return res.status(400).json({ msg: 'Usuario no tiene Discord vinculado' });
    
    // Generar código y expiración
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos
    await User.setRecoveryCode(user.id, code, expires);
    
    // Llamar al bot de Discord para enviar el código
    try {
      await axios.post(process.env.DISCORD_BOT_URL + '/send-recovery-code', {
        discordId: user.discordId,
        code
      });
      return res.json({ msg: 'Código enviado por Discord' });
    } catch (err) {
      return res.status(500).json({ msg: 'Error enviando código por Discord' });
    }
  } catch (error) {
    console.error('Error en recuperación de contraseña:', error);
    return res.status(500).json({ msg: 'Error del servidor' });
  }
};

// Validar código de recuperación
exports.validateRecoveryCode = async (req, res) => {
  const { usernameOrEmail, code } = req.body;
  
  try {
    // Intentar buscar por username primero
    let user = await User.findOne({ username: usernameOrEmail });
    
    // Si no se encuentra, buscar por email
    if (!user) {
      user = await User.findOne({ email: usernameOrEmail });
    }
    
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });
    
    const isValid = await User.validateRecoveryCode(user.id, code);
    if (!isValid) return res.status(400).json({ msg: 'Código inválido o expirado' });
    
    return res.json({ msg: 'Código válido', userId: user.id });
  } catch (error) {
    console.error('Error al validar código de recuperación:', error);
    return res.status(500).json({ msg: 'Error del servidor' });
  }
};

// Resetear contraseña
exports.resetPassword = async (req, res) => {
  const { usernameOrEmail, code, newPassword } = req.body;
  
  try {
    // Intentar buscar por username primero
    let user = await User.findOne({ username: usernameOrEmail });
    
    // Si no se encuentra, buscar por email
    if (!user) {
      user = await User.findOne({ email: usernameOrEmail });
    }
    
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });
    
    const isValid = await User.validateRecoveryCode(user.id, code);
    if (!isValid) return res.status(400).json({ msg: 'Código inválido o expirado' });
    
    const hashed = await bcrypt.hash(newPassword, 12);
    await User.update(user.id, { password: hashed, recoveryCode: null, recoveryCodeExpires: null });
    
    return res.json({ msg: 'Contraseña actualizada' });
  } catch (error) {
    console.error('Error al resetear contraseña:', error);
    return res.status(500).json({ msg: 'Error del servidor' });
  }
}; 