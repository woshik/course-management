const Joi = require('joi');
const { login, registration } = require('./auth');
const { addCourse } = require('./course');

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
  validateId,
};
