const router = require("express").Router();

const { createABooking } = require("../controllers/bookinController");

router.route("/").post(createABooking);

module.exports = router;
