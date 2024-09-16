const getCsrf = async (req, res) => {
  try {
    const csrfToken = req.csrfToken();
    res.status(200).json({
      csrfToken: csrfToken,
      message: 'CSRF token is set. You can now use the web app safely.',
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getCsrf };
