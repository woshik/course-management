const Joi = require('joi');
const { login, registration } = require('./auth');
const { addCourse, assignCourse, courseEvents } = require('./course');
const { addStudent, updateStudent } = require('./student');
const { userInfo, userPassword } = require('./user');

const validateId = {
  id: Joi.string().required().messages({
    'any.required': 'Course id is required',
    'string.empty': 'Course id is required',
  }),
};

module.exports = {
  login,
  registration,
  addCourse,
  addStudent,
  validateId,
  userInfo,
  userPassword,
  assignCourse,
  updateStudent,
  courseEvents,
};
