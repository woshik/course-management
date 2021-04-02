const {
  getCourseDataByCode,
  addCourse,
  getCoursesData,
  removeCoursesData,
  getCoursesById,
  editCourses,
  totalCount: courseCount,
} = require('../model/course');

const add = async (req, res) => {
  const { courseCode } = req.routeData;

  const courseData = await getCourseDataByCode(courseCode);

  if (courseData) {
    return res.status(400).json({ message: 'Course code already exists' });
  }

  if (await addCourse(req.routeData)) {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: 'Operation fail, Try again later' });
  }
};

const getData = async (req, res) => res.json(await getCoursesData(req.routeData));

const remove = async (req, res) => {
  if (await removeCoursesData(req.routeData)) {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: 'Operation fail, Try again later' });
  }
};

const getCourseById = async (req, res) => {
  res.json(await getCoursesById(req.routeData));
};

const edit = async (req, res) => {
  if (await editCourses(req.routeData)) {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: 'Operation fail, Try again later' });
  }
};

const totalCount = async (req, res) => res.json({ count: await courseCount() });

module.exports = {
  add,
  getData,
  remove,
  getCourseById,
  edit,
  totalCount,
};
