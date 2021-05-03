const { param, body, validationResult } = require("express-validator");
const logger = require("../config/winston");
const response = require("./response");

const userIDValidator = () => {
  return [param("id", "invalid ID provided").isInt()];
};

const nameValidator = () => {
  return [body("name", "invalid Name Provided").matches(/^\w+( +\w+)*$/)];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errs = errors.array().map((msg) => msg.msg);
    logger.error(errs[0]);
    return response(res, "error", errs[0], "error");
  }
  return next();
};

module.exports = {
  userIDValidator,
  nameValidator,
  validate,
};
