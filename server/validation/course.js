const Joi = require('joi');

const addCourse = {
  courseName: Joi.string().required().messages({
    'any.required': 'Course name is required',
    'string.empty': 'Course name is required',
  }),
  courseCode: Joi.string().required().messages({
    'any.required': 'Course code is required',
    'string.empty': 'Course code is required',
  }),
};

module.exports = {
  addCourse,
};
