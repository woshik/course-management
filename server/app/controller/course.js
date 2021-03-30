const {
  getCourseDataByCode, addCourse, getCoursesData, removeCoursesData, getCoursesById, editCourses,
} = require('../model/course');

const add = async (req, res, next) => {
  const { courseCode } = req.routeData;

  const courseData = await getCourseDataByCode(courseCode);

  if (courseData) {
    return res.status(400).json({ message: 'Course code already exists' });
  }

  if (await addCourse(req.routeData)) {
    res.json({ success: true });
  } else {
    next();
  }
};

const getData = async (req, res) => {
  res.json(await getCoursesData(req.routeData));
};

const remove = async (req, res, next) => {
  if (await removeCoursesData(req.routeData)) {
    res.json({ success: true });
  } else {
    next();
  }
};

const getCourseById = async (req, res) => {
  res.json(await getCoursesById(req.routeData));
};

const edit = async (req, res, next) => {
  if (await editCourses(req.routeData)) {
    res.json({ success: true });
  } else {
    next();
  }
};

module.exports = {
  add,
  getData,
  remove,
  getCourseById,
  edit,
};
