const {
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
} = require('../validation/index');
const {
  authTokenValidation,
  convertMongoObjectId,
  permission,
} = require('../middleware');
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
  userUpdate: {
    url: '/user/update',
    method: 'patch',
    controller: 'user',
    function: 'update',
    middleware: [authTokenValidation, validate(userInfo)],
  },
  userPassword: {
    url: '/user/password',
    method: 'patch',
    controller: 'user',
    function: 'updatePassword',
    middleware: [authTokenValidation, validate(userPassword)],
  },
  getCourse: {
    url: '/course',
    method: 'get',
    controller: 'course',
    function: 'getData',
    middleware: [authTokenValidation, permission('admin')],
  },
  addCourse: {
    url: '/course',
    method: 'post',
    controller: 'course',
    function: 'add',
    middleware: [authTokenValidation, permission('admin'), validate(addCourse)],
  },
  getCourseCount: {
    url: '/course/count',
    method: 'get',
    controller: 'course',
    function: 'totalCount',
    middleware: [authTokenValidation, permission('admin')],
  },
  getCourseEvent: {
    url: '/course/events',
    method: 'get',
    controller: 'course',
    function: 'getEvents',
    middleware: [authTokenValidation, permission('admin')],
  },
  addCourseEvent: {
    url: '/course/events',
    method: 'post',
    controller: 'course',
    function: 'addEvents',
    middleware: [
      authTokenValidation,
      permission('admin'),
      validate(courseEvents),
    ],
  },
  getCourseEventForStudent: {
    url: '/course/events/student',
    method: 'get',
    controller: 'course',
    function: 'getStudentEvents',
    middleware: [
      authTokenValidation,
      permission('student'),
    ],
  },
  assignCourse: {
    url: '/course/assign/:id',
    method: 'post',
    controller: 'course',
    function: 'assignCourse',
    middleware: [
      authTokenValidation,
      permission('admin'),
      validate(validateId, assignCourse),
      convertMongoObjectId,
    ],
  },
  getAssignStudent: {
    url: '/course/assign/:id',
    method: 'get',
    controller: 'course',
    function: 'getAssignStudent',
    middleware: [
      authTokenValidation,
      permission('admin'),
      validate(validateId),
      convertMongoObjectId,
    ],
  },
  getCourseById: {
    url: '/course/:id',
    method: 'get',
    controller: 'course',
    function: 'getCourseById',
    middleware: [
      authTokenValidation,
      permission('admin'),
      validate(validateId),
      convertMongoObjectId,
    ],
  },
  editCourse: {
    url: '/course/:id',
    method: 'patch',
    controller: 'course',
    function: 'edit',
    middleware: [
      authTokenValidation,
      permission('admin'),
      validate(validateId, addCourse),
      convertMongoObjectId,
    ],
  },
  deleteCourse: {
    url: '/course/:id',
    method: 'delete',
    controller: 'course',
    function: 'remove',
    middleware: [
      authTokenValidation,
      permission('admin'),
      validate(validateId),
      convertMongoObjectId,
    ],
  },
  getStudent: {
    url: '/student',
    method: 'get',
    controller: 'student',
    function: 'getData',
    middleware: [authTokenValidation, permission('admin')],
  },
  getStudentCount: {
    url: '/student/count',
    method: 'get',
    controller: 'student',
    function: 'totalCount',
    middleware: [authTokenValidation, permission('admin')],
  },

  addStudent: {
    url: '/student',
    method: 'post',
    controller: 'student',
    function: 'add',
    middleware: [
      authTokenValidation,
      permission('admin'),
      validate(addStudent),
    ],
  },

  studentAndCourseData: {
    url: '/student/course/:id',
    method: 'get',
    controller: 'student',
    function: 'getStudentAndCourseDataById',
    middleware: [
      authTokenValidation,
      permission('admin'),
      validate(validateId),
      convertMongoObjectId,
    ],
  },
  changeStudentStatus: {
    url: '/student/status/:id',
    method: 'patch',
    controller: 'student',
    function: 'updateStatus',
    middleware: [
      authTokenValidation,
      permission('admin'),
      validate(validateId),
      convertMongoObjectId,
    ],
  },
  resetPassword: {
    url: '/student/reset/:id',
    method: 'post',
    controller: 'student',
    function: 'resetPassword',
    middleware: [
      authTokenValidation,
      permission('admin'),
      validate(validateId),
      convertMongoObjectId,
    ],
  },
  getStudentById: {
    url: '/student/:id',
    method: 'get',
    controller: 'student',
    function: 'getDataById',
    middleware: [
      authTokenValidation,
      permission('admin'),
      validate(validateId),
      convertMongoObjectId,
    ],
  },
  editStudent: {
    url: '/student/:id',
    method: 'patch',
    controller: 'student',
    function: 'edit',
    middleware: [
      authTokenValidation,
      permission('admin'),
      validate(validateId, updateStudent),
      convertMongoObjectId,
    ],
  },
  deleteStudent: {
    url: '/student/:id',
    method: 'delete',
    controller: 'student',
    function: 'remove',
    middleware: [
      authTokenValidation,
      permission('admin'),
      validate(validateId),
      convertMongoObjectId,
    ],
  },
};
