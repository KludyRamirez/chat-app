const express = require('express');
const router = express.Router();
const mainController = require('../controllers/MainController');

const { csrfToken } = require('../middlewares/VerifyCSRF');

router.post('/login', csrfToken, mainController.controllers.login);

module.exports = router;
