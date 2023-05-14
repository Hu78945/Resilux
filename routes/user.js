const router = require("express").Router();
const { getUser, updateUser } = require("../controllers/userController");

router.route("/:id").get(getUser).put(updateUser);

module.exports = router;
