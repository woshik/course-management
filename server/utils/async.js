const logger = require('./serverErrorLogger');

const asyncController = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (err) {
    logger.error({ label: 'server error', message: err.stack });
    next();
  }
};

const asyncFunction = (handler) => async (...args) => {
  // eslint-disable-next-line no-useless-catch
  try {
    return await handler(...args);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  asyncController,
  asyncFunction,
};
