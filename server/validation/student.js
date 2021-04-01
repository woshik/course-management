const Joi = require('joi');

const addStudent = {
  fullName: Joi.string().min(3).required().messages({
    'any.required': 'Full name is required',
    'string.empty': 'Full name is required',
    'string.min': 'Full name must be at least 3 characters long',
  }),
  dob: Joi.date().required().messages({
    'date.base': 'Date of birth must be a valid date',
  }),
  email: Joi.string().email().lowercase().required()
    .messages({
      'string.email': 'Enter a valid email address',
      'any.required': 'Email is required',
      'string.empty': 'Email is required',
    }),
};

module.exports = {
  addStudent,
};
