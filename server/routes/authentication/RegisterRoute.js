const express = require('express');
const router = express.Router();
const mainController = require('../controllers/MainController');

const { csrfToken, csrfErrorHandler } = require('../../middlewares/VerifyCSRF');

router.post('/register', csrfToken, mainController.controllers.register);

module.exports = router;
