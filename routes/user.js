const router = require("express").Router();
const { getUser, updateUser,deleteUser } = require("../controllers/userController");
const {
  checkIfAuthenticated,
  checkUserRole,
} = require("../controllers/authController");

router
  .route("/:id")
  .get(getUser)
  .put(checkIfAuthenticated, checkUserRole, updateUser);

router.route('/:email').delete(checkIfAuthenticated,checkUserRole,deleteUser);

module.exports = router;
