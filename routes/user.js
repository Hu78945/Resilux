const router = require("express").Router();
const {
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.route("/:id").get(getUser);

router.route("/:email").delete(deleteUser).put(updateUser);

module.exports = router;
