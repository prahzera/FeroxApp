const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    
    // Eliminar la contraseña de cada usuario
    const usersWithoutPassword = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    
    res.json(usersWithoutPassword);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Validar datos
    if (!username || !password) {
      return res.status(400).json({ msg: 'Por favor, ingresa todos los campos requeridos' });
    }

    // Verificar si el usuario ya existe
    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    // Verificar si el email ya existe (si se proporcionó)
    if (email) {
      let userWithEmail = await User.findOne({ email });
      if (userWithEmail) {
        return res.status(400).json({ msg: 'El email ya está registrado' });
      }
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, 12);

    // Crear el usuario
    user = await User.create({
      username,
      password: hashedPassword,
      email
    });
    
    const { password: pwd, ...userWithoutPassword } = user;
    res.json({ 
      msg: 'Usuario creado correctamente. Para activar tu cuenta, vincula tu cuenta de Discord usando el código de activación.', 
      user: userWithoutPassword 
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};

// Generar un nuevo código de activación
exports.generateActivationCode = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    
    // Si ya está activado, no permitir generar un nuevo código
    if (user.isActive) {
      return res.status(400).json({ msg: 'La cuenta ya está activada' });
    }
    
    const activationCode = await User.generateNewActivationCode(userId);
    
    res.json({ 
      msg: 'Nuevo código de activación generado', 
      activationCode 
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};

// Verificar si un usuario está activo
exports.checkUserStatus = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    
    res.json({ 
      isActive: user.isActive,
      discordLinked: !!user.discordId
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
}; 