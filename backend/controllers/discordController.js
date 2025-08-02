const User = require('../models/User');

// Vincular cuenta de Discord con cuenta de FeroxApp
exports.linkAccount = async (req, res) => {
  const { activationCode, discordUser } = req.body;

  try {
    // Validar datos
    if (!activationCode || !discordUser || !discordUser.id) {
      return res.status(400).json({ msg: 'Datos incompletos' });
    }

    // Verificar si el código de activación es válido
    const user = await User.findOne({ activationCode });

    if (!user) {
      return res.status(404).json({ msg: 'Código de activación no válido o ya utilizado' });
    }

    // Verificar si el usuario de Discord ya está vinculado a otra cuenta
    const existingUser = await User.findOne({ discordId: discordUser.id });

    if (existingUser && existingUser.id !== user.id) {
      return res.status(409).json({ msg: 'Esta cuenta de Discord ya está vinculada a otra cuenta' });
    }

    // Vincular la cuenta
    const updatedUser = await User.linkDiscord(activationCode, {
      id: discordUser.id,
      username: discordUser.username,
      avatar: discordUser.avatar
    });

    if (!updatedUser) {
      return res.status(500).json({ msg: 'Error al vincular la cuenta' });
    }

    // Responder con los datos del usuario actualizado
    const { password, ...userWithoutPassword } = updatedUser;
    res.json(userWithoutPassword);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
}; 