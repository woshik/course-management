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
        courseName: RegExp(`.*${query.search_keyword}.*`, 'i'),
      },
      {
        courseCode: RegExp(`.*${query.search_keyword}.*`, 'i'),
      },
    ],
  };

  const courseData = await courses.find(where, {
    skip: (parseInt(query.current_page) - 1) * parseInt(query.per_page),
    limit: parseInt(query.per_page),
  }).toArray();

  return {
    data: courseData,
    total: await courses.countDocuments(where),
  };
});

module.exports = {
  getCourseDataByCode,
  getCoursesData,
  addCourse,
};
