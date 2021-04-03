const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getUser, userRegistration } = require('../model/user');

const login = async (req, res, next) => {
  const { email, password } = req.routeData;

  const userData = await getUser({ email }, {});

  if (!userData) {
    return res.status(400).json({ message: 'Wrong email address' });
  }

  const isMatch = await bcrypt.compare(password, userData.password);

  if (isMatch) {
    delete userData.password;

    jwt.sign({ id: userData._id }, process.env.SECRET_TOKEN, (err, token) => {
      if (err) {
        return next();
      }

      delete userData._id;

      return res
        .header('auth-token', token)
        .json({ token, userData });
    });
  } else {
    return res.status(400).json({ message: 'Invalid password' });
  }
};

const registration = async (req, res) => {
  const userData = { ...req.routeData, active: false };

  const userExist = await getUser({ email: userData.email });

  if (userExist) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));

  userData.password = hashedPassword;
  userData.role = 'student';
  delete userData.confirmPassword;

  if (await userRegistration(userData)) {
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: 'Operation fail, Try again later' });
  }
};

module.exports = {
  login,
  registration,
};
