const logger = require("../../config/winston");
const response = require("../../utils/response");
const userService = require("./user.service");

module.exports = {
  async getAllUsers(_, res) {
    try {
      const data = await userService.getUsers();
      return response(res, "success", data, "data");
    } catch (error) {
      logger.error(error);
      return response(res, "error", error, "error");
    }
  },

  async createUser(req, res) {
    const { name } = req.body;
    try {
      const result = await userService.createUser(name);
      return response(res, "success", result, "data");
    } catch (error) {
      logger.error(error);
      return response(res, "error", error, "error");
    }
  },

  async getUserbyID(req, res) {
    const { id } = req.params;
    try {
      const result = await userService.getUserbyID(id);
      return response(res, "success", result, "data");
    } catch (error) {
      logger.error(error.message);
      return response(res, "error", error.message, "error");
    }
  },
};

// module.exports = {
//   getAllUsers,
//   createUser,
//   getUserbyID,
// };
