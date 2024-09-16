const csurf = require('csurf');
const csrfToken = csurf({ cookie: true });

const csrfErrorHandler = (err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);

  res.status(403).send('Invalid CSRF token');
};

module.exports = {
  csrfToken,
  csrfErrorHandler,
};
