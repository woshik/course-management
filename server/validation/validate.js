const Joi = require('joi');

const validate = (validationRules) => (req, res, next) => {
  const joiSchema = Joi.object(validationRules);

  req.validationResult = joiSchema.validate(req.routeData);

  next();
};

module.exports = validate;
