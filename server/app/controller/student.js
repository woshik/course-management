const bcrypt = require('bcryptjs');
const {
  getStudentDataByEmail,
  getStudentsData,
  addStudent,
  removeStudentData,
  getStudentById,
  editStudent,
  totalCount: studentCount,
  editStudentStatus,
  getStudentAndCourseData,
  resetStudentPassword,
} = require('../model/student');

const add = async (req, res) => {
  const userData = { ...req.routeData, active: false };

  const userExist = await getStudentDataByEmail(userData.email);

  if (userExist) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  const hashedPassword = await bcrypt.hash('123456', await bcrypt.genSalt(10));

  userData.password = hashedPassword;
  userData.role = 'student';

  if (await addStudent(userData)) {
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: 'Operation fail, Try again later' });
  }
};

const getData = async (req, res) => {
  res.json(await getStudentsData(req.routeData));
};

const remove = async (req, res) => {
  if (await removeStudentData(req.routeData)) {
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: 'Operation fail, Try again later' });
  }
};

const getDataById = async (req, res) => {
  res.json(await getStudentById(req.routeData));
};

const edit = async (req, res) => {
  if (await editStudent(req.routeData)) {
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: 'Operation fail, Try again later' });
  }
};

const totalCount = async (req, res) => res.json({ count: await studentCount() });

const updateStatus = async (req, res) => {
  if (await editStudentStatus(req.routeData)) {
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: 'Operation fail, Try again later' });
  }
};

const getStudentAndCourseDataById = async (req, res) => {
  res.json(await getStudentAndCourseData(req.routeData));
};

const resetPassword = async (req, res) => {
  const hashedPassword = await bcrypt.hash('123456', await bcrypt.genSalt(10));
  if (await resetStudentPassword({ id: req.routeData.id, password: hashedPassword })) {
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: 'Operation fail, Try again later' });
  }
};

module.exports = {
  add,
  getData,
  remove,
  getDataById,
  edit,
  totalCount,
  updateStatus,
  getStudentAndCourseDataById,
  resetPassword,
};
