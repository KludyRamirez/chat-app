//auth

const {
  register,
} = require('../controllers/authentication/RegisterController');

const { login } = require('../controllers/authentication/LoginController');

//csrf
const { getCsrf } = require('../controllers/SecurityController');

exports.controllers = { register, login, getCsrf };
