/* eslint-disable radix */
const { getDB } = require('../../database/connection');
const { asyncFunction } = require('../../utils/async');

const getCourseDataByCode = asyncFunction(async (courseCode, projection = {
  _id: 0,
}) => {
  const courses = await getDB().collection('courses');

  const course = await courses.findOne({
    courseCode,
  }, {
    projection,
  });

  return course;
});

const addCourse = asyncFunction(async (courseData) => {
  const courses = await getDB().collection('courses');

  const course = await courses.insertOne(courseData);

  return course.insertedCount === 1;
});

const getCoursesData = asyncFunction(async (query) => {
  const courses = await getDB().collection('courses');

  const where = {
    $or: [
      {
        courseName: RegExp(`.*${query?.search_keyword ?? ''}.*`, 'i'),
      },
      {
        courseCode: RegExp(`.*${query?.search_keyword ?? ''}.*`, 'i'),
      },
    ],
  };

  const perPage = parseInt(query?.perPage ?? 15);
  const currentPage = (parseInt(query?.current_page ?? 1) - 1);

  const courseData = await courses.find(where, {
    skip: currentPage * perPage,
    limit: perPage,
  }).toArray();

  return {
    data: courseData,
    total: await courses.countDocuments(where),
  };
});

const removeCoursesData = asyncFunction(async ({ id }) => {
  const courses = await getDB().collection('courses');

  const result = await courses.deleteOne({
    _id: id,
  });

  return result.deletedCount === 1;
});

const getCoursesById = asyncFunction(async ({ id }) => {
  const courses = await getDB().collection('courses');

  const result = await courses.findOne({
    _id: id,
  });

  return result;
});

const editCourses = asyncFunction(async ({ id, courseName, courseCode }) => {
  const courses = await getDB().collection('courses');

  const result = await courses.updateOne({ _id: id },
    {
      $set: {
        courseName, courseCode,
      },
    });

  return result;
});

const totalCount = asyncFunction(async () => {
  const courses = await getDB().collection('courses');
  const result = await courses.countDocuments();
  return result;
});

module.exports = {
  getCourseDataByCode,
  getCoursesData,
  addCourse,
  removeCoursesData,
  getCoursesById,
  editCourses,
  totalCount,
};
