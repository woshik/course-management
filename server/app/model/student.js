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
    projection: {
      password: 0,
    },
  }).toArray();

  return {
    data: studentData,
    total: await students.countDocuments(where),
  };
});

const removeStudentData = asyncFunction(async ({ id }) => {
  const students = await getDB().collection('users');
  const courses = await getDB().collection('courses');

  courses.updateMany({}, {
    $pull: { student: id },
  });

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

const editStudent = asyncFunction(async ({ id, fullName, dob }) => {
  const students = await getDB().collection('users');

  const result = await students.updateOne({ _id: id },
    {
      $set: {
        fullName,
        dob,
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

const editStudentStatus = asyncFunction(async ({ id }) => {
  const students = await getDB().collection('users');

  const student = await students.findOne({
    _id: id,
  });

  const result = await students.updateOne({ _id: id },
    {
      $set: {
        active: !student.active,
      },
    });

  return result.modifiedCount === 1;
});

const getStudentAndCourseData = asyncFunction(async ({ id }) => {
  const students = await getDB().collection('users');
  const result = await students.aggregate([
    {
      $match: { _id: id },
    },
    {
      $lookup: {
        from: 'courses',
        localField: '_id',
        foreignField: 'student',
        as: 'courses_details',
      },
    },
    {
      $project: {
        _id: 0,
        password: 0,
        active: 0,
        role: 0,
        courses_details: { _id: 0, student: 0 },
      },
    },
  ]).toArray();

  return result[0] ? result[0] : result;
});

const resetStudentPassword = asyncFunction(async ({ id, password }) => {
  const students = await getDB().collection('users');

  const result = await students.updateOne({ _id: id },
    {
      $set: {
        password,
      },
    });

  return result.modifiedCount === 1;
});

module.exports = {
  getStudentDataByEmail,
  getStudentsData,
  addStudent,
  removeStudentData,
  getStudentById,
  editStudent,
  totalCount,
  editStudentStatus,
  getStudentAndCourseData,
  resetStudentPassword,
};
