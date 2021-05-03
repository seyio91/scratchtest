const router = require("express").Router();
const userController = require("./users.controller");
const {
  userIDValidator,
  nameValidator,
  validate,
} = require("../../utils/validators");

router.get("/users", userController.getAllUsers);

router.post("/users", nameValidator(), validate, userController.createUser);

router.get(
  "/users/:id",
  userIDValidator(),
  validate,
  userController.getUserbyID
);

module.exports = router;
