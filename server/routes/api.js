const {
  login, registration, addCourse, validateId,
} = require('../validation/index');
const { authTokenValidation, convertMongoObjectId } = require('../middleware');
const validate = require('../validation/validate');

module.exports = {
  login: {
    url: '/login',
    method: 'post',
    controller: 'auth',
    function: 'login',
    middleware: [validate(login)],
  },
  registration: {
    url: '/registration',
    method: 'post',
    controller: 'auth',
    function: 'registration',
    middleware: [validate(registration)],
  },
  getCourse: {
    url: '/course',
    method: 'get',
    controller: 'course',
    function: 'getData',
    middleware: [authTokenValidation],
  },
  getCourseById: {
    url: '/course/:id',
    method: 'get',
    controller: 'course',
    function: 'getCourseById',
    middleware: [authTokenValidation, validate(validateId), convertMongoObjectId],
  },
  addCourse: {
    url: '/course',
    method: 'post',
    controller: 'course',
    function: 'add',
    middleware: [authTokenValidation, validate(addCourse)],
  },
  editCourse: {
    url: '/course/:id',
    method: 'patch',
    controller: 'course',
    function: 'edit',
    middleware: [authTokenValidation, validate(validateId), convertMongoObjectId],
  },
  deleteCourse: {
    url: '/course/:id',
    method: 'delete',
    controller: 'course',
    function: 'remove',
    middleware: [authTokenValidation, validate(validateId), convertMongoObjectId],
  },
};
