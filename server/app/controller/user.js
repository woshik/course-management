const bcrypt = require('bcryptjs');
const { updateUserInfo } = require('../model/user');

const update = async (req, res) => {
  if (req.user.role === 'admin') {
    delete req.routeData.dob;
  }

  if (await updateUserInfo({ _id: req.user._id }, req.routeData)) {
    res.json({ success: true });
  } else {
    res
      .status(400)
      .json({ success: false, message: 'Operation fail, Try again later' });
  }
};

const updatePassword = async (req, res) => {
  const isMatch = await bcrypt.compare(req.routeData.currentPassword, req.user.password);

  if (isMatch) {
    const hashedPassword = await bcrypt.hash(req.routeData.newPassword, await bcrypt.genSalt(10));

    if (await updateUserInfo({ _id: req.user._id }, { password: hashedPassword })) {
      res.json({ success: true });
    } else {
      res
        .status(400)
        .json({ success: false, message: 'Operation fail, Try again later' });
    }
  } else {
    return res.status(400).json({ message: 'Invalid current password' });
  }
};

module.exports = {
  update,
  updatePassword,
};
