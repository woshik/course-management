const { getDB } = require('../../database/connection');
const { asyncFunction } = require('../../utils/async');

const getUser = asyncFunction(async (where, projection = {
  _id: 0,
  password: 0,
}) => {
  const users = await getDB().collection('users');

  const user = await users.findOne(where, {
    projection,
  });

  return user;
});

const userRegistration = asyncFunction(async (userData) => {
  const users = await getDB().collection('users');

  const user = await users.insertOne(userData);

  return user.insertedCount === 1;
});

const updateUserInfo = asyncFunction(async (where, userData) => {
  const users = await getDB().collection('users');

  const result = await users.updateOne(where, {
    $set: { ...userData },
  });

  return result.modifiedCount === 1;
});

module.exports = {
  getUser,
  userRegistration,
  updateUserInfo,
};
