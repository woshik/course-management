const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const { getUser } = require('../app/model/user');

module.exports = (req, res, next) => {
  const token = req.header('X-Auth-Token');

  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  jwt.verify(token, process.env.SECRET_TOKEN, async (err, decoded) => {
    if (err) {
      res.status(401).send({ message: 'Invalid token' });
      return;
    }

    try {
      const userData = await getUser({ _id: ObjectId(decoded.id) }, {});
      req.user = userData;
      next();
    } catch (error) {
      next(error);
    }
  });
};
