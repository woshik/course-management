/* eslint-disable radix */
const { ObjectId } = require('mongodb');
const { getDB } = require('../../database/connection');
const { asyncFunction } = require('../../utils/async');

const getCourseDataByCode = asyncFunction(
  async (
    courseCode,
    projection = {
      _id: 0,
    },
  ) => {
    const courses = await getDB().collection('courses');

    const course = await courses.findOne(
      {
        courseCode,
      },
      {
        projection,
      },
    );

    return course;
  },
);

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
  const currentPage = parseInt(query?.current_page ?? 1) - 1;

  const courseData = await courses
    .find(where, {
      skip: currentPage * perPage,
      limit: perPage,
      projection: {
        student: 0,
      },
    })
    .toArray();

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

  const result = await courses.findOne(
    {
      _id: id,
    },
    {
      projection: {
        student: 0,
      },
    },
  );

  return result;
});

const editCourses = asyncFunction(async ({ id, courseName, courseCode }) => {
  const courses = await getDB().collection('courses');

  const result = await courses.updateOne(
    { _id: id },
    {
      $set: {
        courseName,
        courseCode,
      },
    },
  );

  return result.modifiedCount === 1;
});

const totalCount = asyncFunction(async () => {
  const courses = await getDB().collection('courses');
  const result = await courses.countDocuments();
  return result;
});

const assign = asyncFunction(async (id, ids) => {
  const courses = await getDB().collection('courses');

  const result = await courses.updateOne(
    { _id: id },
    {
      $set: {
        student: ids,
      },
    },
  );

  return result.modifiedCount === 1;
});

const getStudents = asyncFunction(async (id) => {
  const courses = await getDB().collection('courses');

  const result = await courses
    .aggregate([
      {
        $match: { _id: id },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'student',
          foreignField: '_id',
          as: 'student_details',
        },
      },
      {
        $project: {
          _id: 0,
          student: 0,
          courseCode: 0,
          courseName: 0,
          student_details: { password: 0 },
        },
      },
    ])
    .toArray();

  return result[0] ? result[0] : result;
});

const createEvent = asyncFunction(async (data) => {
  const courses = await getDB().collection('courses');

  const ids = new Map();

  if (Object.keys(data).length) {
    const courseIds = await courses
      .find(
        {},
        {
          projection: {
            _id: 1,
          },
        },
      )
      .toArray();

    courseIds.forEach((info) => {
      ids.set(info._id.toString(), true);
    });
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      if (ids.has(key)) {
        ids.delete(key);
      }

      courses.updateOne(
        { _id: ObjectId(key) },
        {
          $set: {
            events: data[key],
          },
        },
      );
    }
  }

  if (Object.keys(data).length) {
    ids.forEach((value, key) => {
      courses.updateOne(
        { _id: ObjectId(key) },
        {
          $unset: {
            events: '',
          },
        },
      );
    });
  }

  return true;
});

const getCourseEvents = asyncFunction(async () => {
  const courses = await getDB().collection('courses');

  const result = courses
    .find(
      {},
      {
        projection: {
          courseName: 0,
          courseCode: 0,
          student: 0,
        },
      },
    )
    .toArray();

  return result;
});

const getStudentCourseEvents = asyncFunction(async (id) => {
  const courses = await getDB().collection('courses');

  const result = await courses
    .find({
      student: {
        $in: [id],
      },
    },
    {
      projection: {
        events: 1,
        _id: 0,
      },
    })
    .toArray();

  let finalOutput = [];

  result.forEach((data) => {
    finalOutput = [
      ...finalOutput,
      ...(data?.events ?? []),
    ];
  });

  return finalOutput;
});

module.exports = {
  getCourseDataByCode,
  getCoursesData,
  addCourse,
  removeCoursesData,
  getCoursesById,
  editCourses,
  totalCount,
  assign,
  getStudents,
  createEvent,
  getCourseEvents,
  getStudentCourseEvents,
};
