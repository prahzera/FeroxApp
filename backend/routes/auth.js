const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// @route   POST api/auth/login
// @desc    Autenticar usuario y obtener token
// @access  Public
router.post('/login', authController.login);

// @route   GET api/auth/me
// @desc    Obtener datos del usuario autenticado
// @access  Private
router.get('/me', auth, authController.getMe);

// Recuperación de contraseña
router.post('/recover', authController.recoverPassword);
router.post('/validate-recovery', authController.validateRecoveryCode);
router.post('/reset-password', authController.resetPassword);

module.exports = router; 