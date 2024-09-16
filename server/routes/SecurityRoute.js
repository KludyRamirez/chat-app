const express = require('express');
const router = express.Router();
const mainController = require('../controllers/MainController');

const { csrfToken } = require('../middlewares/VerifyCSRF');

router.get('/csrf-token', csrfToken, mainController.controllers.getCsrf);

module.exports = router;
