const bcrypt = require('bcryptjs');
const {
  getStudentDataByEmail,
  getStudentsData,
  addStudent,
  removeStudentData,
  getStudentById,
  editStudent,
} = require('../model/student');

const add = async (req, res, next) => {
  const userData = { ...req.routeData, active: false };

  const userExist = await getStudentDataByEmail(userData.email);

  if (userExist) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  const hashedPassword = await bcrypt.hash('test123', await bcrypt.genSalt(10));

  userData.password = hashedPassword;
  userData.role = 'user';

  const inserted = await addStudent(userData);

  if (inserted) {
    res.json({ success: true });
  } else {
    next();
  }
};

const getData = async (req, res) => {
  res.json(await getStudentsData(req.routeData));
};

const remove = async (req, res, next) => {
  if (await removeStudentData(req.routeData)) {
    res.json({ success: true });
  } else {
    next();
  }
};

const getDataById = async (req, res) => {
  res.json(await getStudentById(req.routeData));
};

const edit = async (req, res, next) => {
  if (await editStudent(req.routeData)) {
    res.json({ success: true });
  } else {
    next();
  }
};

module.exports = {
  add,
  getData,
  remove,
  getDataById,
  edit,
};
