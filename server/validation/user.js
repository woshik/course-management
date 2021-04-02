const Joi = require('joi');

const userInfo = {
  fullName: Joi.string().min(3).required().messages({
    'any.required': 'Full name is required',
    'string.empty': 'Full name is required',
    'string.min': 'Full name must be at least 3 characters long',
  }),
  dob: Joi.date().messages({
    'date.base': 'Date of birth must be a valid date',
  }),
};

const userPassword = {
  currentPassword: Joi.string().required().messages({
    'any.required': 'Current password is required',
    'string.empty': 'Current password is required',
  }),
  newPassword: Joi.string().min(6).required().messages({
    'any.required': 'New password is required',
    'string.empty': 'New password is required',
    'string.min': 'New password length must be at least 6 characters long',
  }),
  confirmPassword: Joi.string()
    .valid(Joi.ref('newPassword'))
    .required()
    .messages({
      'any.only': 'Confirm password and password need to be same',
    }),
};

module.exports = {
  userInfo,
  userPassword,
};
