/* eslint-disable radix */
const { getDB } = require('../../database/connection');
const { asyncFunction } = require('../../utils/async');

const getStudentDataByEmail = asyncFunction(async (email, projection = {
  _id: 0,
}) => {
  const students = await getDB().collection('users');

  const course = await students.findOne({
    email,
  }, {
    projection,
  });

  return course;
});

const addStudent = asyncFunction(async (courseData) => {
  const students = await getDB().collection('users');

  const course = await students.insertOne(courseData);

  return course.insertedCount === 1;
});

const getStudentsData = asyncFunction(async (query) => {
  const students = await getDB().collection('users');

  const where = {
    role: 'student',
    $or: [
      {
        fullName: RegExp(`.*${query?.search_keyword ?? ''}.*`, 'i'),
      },
      {
        email: RegExp(`.*${query?.search_keyword ?? ''}.*`, 'i'),
      },
    ],
  };

  const perPage = 15;
  const currentPage = (parseInt(query?.current_page ?? 1) - 1);

  const studentData = await students.find(where, {
    skip: currentPage * perPage,
    limit: perPage,
  }).toArray();

  return {
    data: studentData,
    total: await students.countDocuments(where),
  };
});

const removeStudentData = asyncFunction(async ({ id }) => {
  const students = await getDB().collection('users');

  const result = await students.deleteOne({
    _id: id,
  });

  return result.deletedCount === 1;
});

const getStudentById = asyncFunction(async ({ id }) => {
  const students = await getDB().collection('users');

  const result = await students.findOne({
    _id: id,
  });

  return result;
});

const editStudent = asyncFunction(async ({ id, courseName, courseCode }) => {
  const students = await getDB().collection('users');

  const result = await students.updateOne({ _id: id },
    {
      $set: {
        courseName,
        courseCode,
      },
    });

  return result;
});

const totalCount = asyncFunction(async () => {
  const students = await getDB().collection('users');
  const result = await students.countDocuments({
    role: 'student',
  });
  return result;
});

module.exports = {
  getStudentDataByEmail,
  getStudentsData,
  addStudent,
  removeStudentData,
  getStudentById,
  editStudent,
  totalCount,
};
