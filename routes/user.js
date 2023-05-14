const router = require("express").Router();
const { getUser, updateUser } = require("../controllers/userController");
const {
  checkIfAuthenticated,
  checkUserRole,
} = require("../controllers/authController");

router
  .route("/:id")
  .get(getUser)
  .put(checkIfAuthenticated, checkUserRole, updateUser);

module.exports = router;
