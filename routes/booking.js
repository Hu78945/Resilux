const router = require("express").Router();

const { createABooking } = require("../controllers/bookinController");

router.route("/:email").post(createABooking);

module.exports = router;
