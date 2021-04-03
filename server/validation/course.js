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

const assignCourse = {
  ids: Joi.array().items(Joi.string().required()).messages({
    'array.includesRequiredUnknowns': 'Student id not found',
  }),
};

module.exports = {
  addCourse,
  assignCourse,
};
