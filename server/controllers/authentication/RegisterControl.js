const User = require('../../models/Users');
const bcrypt = require('bcryptjs');
// const History = require('../../models/History');

const register = async (req, res) => {
  const userData = req.user;

  try {
    const { username, nickname, surname, password, email, role } = req.body;

    const usernameExists = await User.exists({
      username: username,
    });

    if (usernameExists) {
      return res.status(409).json({
        message: 'Sorry, that username already exists. Try another one.',
      });
    }

    const emailExists = await User.exists({
      email: email,
    });

    if (emailExists) {
      return res.status(409).json({
        message: 'Sorry, that email already exists. Try another one.',
      });
    }

    const latestUser = await User.findOne().sort({ uid: -1 }).limit(1);

    let newUid = 1;

    if (latestUser && !isNaN(parseInt(latestUser.uid))) {
      newUid = parseInt(latestUser.uid) + 1;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      uid: newUid,
      username,
      nickname,
      surname,
      password: encryptedPassword,
      email,
      role,
    });

    // await History.create({
    //   userId: userData._id,
    //   typeOfNotif: 'Authentication',
    //   actionOfNotif: 'Add',
    //   message: `${user.username} account has been created successfully.`,
    // });

    res.status(200).json({
      userDetails: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      message: `${user.username} account has been created successfully.`,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Something went wrong. Please try again' });
  }
};

module.exports = { register };
