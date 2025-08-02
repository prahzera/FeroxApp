const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// @route   GET api/users
// @desc    Obtener todos los usuarios
// @access  Public
router.get('/', userController.getUsers);

// @route   GET api/users/:id
// @desc    Obtener un usuario por ID
// @access  Public
router.get('/:id', userController.getUserById);

// @route   POST api/users
// @desc    Crear un nuevo usuario
// @access  Public
router.post('/', userController.createUser);

// @route   GET api/users/:id/status
// @desc    Verificar si un usuario está activo
// @access  Public
router.get('/:id/status', userController.checkUserStatus);

// @route   POST api/users/:id/activation-code
// @desc    Generar un nuevo código de activación
// @access  Public
router.post('/:id/activation-code', userController.generateActivationCode);

module.exports = router; 