const express = require('express');
const router = express.Router();
const discordController = require('../controllers/discordController');

// @route   POST api/discord/link
// @desc    Vincular cuenta de Discord con cuenta de FeroxApp
// @access  Public
router.post('/link', discordController.linkAccount);

module.exports = router; 