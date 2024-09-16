const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const History = require('../../models/History');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });

    if (!user) {
      return res
        .status(400)
        .json({ message: 'Invalid credentials. Please try again.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: 'Invalid credentials. Please try again.' });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
        username: username,
      },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: '1d',
      }
    );

    const refreshToken = jwt.sign(
      {
        _id: user._id,
        role: user.role,
        username: username,
      },
      process.env.REFRESH_TOKEN,
      {
        expiresIn: '1d',
      }
    );

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000,
    });

    // await History.create({
    //   userId: user._id,
    //   typeOfNotif: 'Authentication',
    //   actionOfNotif: 'Add',
    //   message: `${user.username} has logged in successfully.`,
    //   createdAt: new Date(),
    // });

    return res.status(200).json({
      userDetails: {
        _id: user._id,
        token: token,
        role: user.role,
        username: username,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Something went wrong. Please try again.' });
  }
};

const handleRefreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.jwt;

    if (!refreshToken) {
      return res.status(404).json({ message: 'No refresh token available!' });
    }

    const user = await User.findOne({ refreshToken: refreshToken });

    if (!user) {
      return res.status(404).json({ message: 'Unknown user!' });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
      if (err || user.username !== decoded.username) {
        return res
          .status(404)
          .json({ message: 'JWT token verification error!' });
      }

      const accessToken = jwt.sign(
        {
          _id: user._id,
          username: decoded.username,
          role: user.role,
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: '1d' }
      );

      return res.status(200).json({
        userDetails: {
          _id: user._id,
          token: accessToken,
          role: user.role,
          username: user.username,
        },
      });
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server error!' });
  }
};

const handleLogout = async (req, res) => {
  const cookies = req.cookies;

  try {
    if (!cookies?.jwt)
      return res.status(404).json({ message: 'No cookie available!' });

    const refreshToken = cookies.jwt;

    const account = await User.findOne({ refreshToken: refreshToken });

    if (!account) {
      res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      });
      return res.status(404).json({ message: 'JWT token verification error!' });
    }

    await User.updateOne(
      { refreshToken: refreshToken },
      { $set: { refreshToken: '' } }
    );

    res.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });

    res.status(200).json({ message: 'Logout successful!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error!' });
  }
};

module.exports = { login, handleRefreshToken, handleLogout };
