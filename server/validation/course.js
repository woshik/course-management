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
  ids: Joi.array().items(Joi.string()).messages({
    'array.includesRequiredUnknowns': 'Student id not found',
  }),
};

const courseEvents = {
  data: Joi.array().items(Joi.object().keys({
    id: Joi.string(),
    title: Joi.string(),
    startTime: Joi.string(),
    endTime: Joi.string(),
    daysOfWeek: Joi.number(),
  })).required().messages({
    'array.includesRequiredUnknowns': 'Student id not found',
  }),
};

const attendance = {
  date: Joi.date().required().messages({
    'any.required': 'Date of birth must be a valid date',
    'date.base': 'Date of birth must be a valid date',
  }),
  attendanceList: Joi.array().items(Joi.string()).required().messages({
    'array.includesRequiredUnknowns': 'Student id not found',
  }),
};

const getAttendance = {
  startDate: Joi.date(),
  endDate: Joi.date(),
  date: Joi.date(),
};

module.exports = {
  addCourse,
  assignCourse,
  courseEvents,
  attendance,
  getAttendance,
};
