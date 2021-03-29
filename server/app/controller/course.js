const { getCourseDataByCode, addCourse, getCoursesData } = require('../model/course');

const add = async (req, res, next) => {
  const { courseCode } = req.routeData;

  const courseData = await getCourseDataByCode(courseCode);

  if (courseData) {
    return res.status(400).json({ message: 'Course code already exists' });
  }

  const inserted = await addCourse(req.routeData);

  if (inserted) {
    res.json({ success: true });
  } else {
    next();
  }
};

const getData = async (req, res) => {
  res.json(await getCoursesData(req.routeData));
};

module.exports = {
  add,
  getData,
};
