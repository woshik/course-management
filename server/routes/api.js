const { login, registration, addCourse } = require('../validation/index');
const { authTokenValidation } = require('../middleware');
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
  addCourse: {
    url: '/course',
    method: 'post',
    controller: 'course',
    function: 'add',
    middleware: [authTokenValidation, validate(addCourse)],
  },

};
