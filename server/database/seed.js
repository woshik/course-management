const bcrypt = require('bcryptjs');
const { connectWithMongodb, getDB } = require('./connection');
require('dotenv').config();

connectWithMongodb(async () => {
  const user = await getDB().collection('users');
  const data = await user.findOne({
    email: 'test@test.com',
  });

  if (data) {
    console.log('\n\ntest admin already exist in database\n\n');
  } else {
    const newUser = await user.insertOne({
      fullName: 'Test',
      email: 'test@test.com',
      password: await bcrypt.hash('12345678', await bcrypt.genSalt(10)),
      role: 'admin',
    });

    console.log(newUser);
  }

  process.exit(1);
});
