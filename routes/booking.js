const router = require("express").Router();

const {
  createABooking,
  getABooking,
  UpdateABooking,
  DeleteABooking,
} = require("../controllers/bookinController");

router.route("/").post(createABooking);
router
  .route("/:id")
  .get(getABooking)
  .put(UpdateABooking)
  .delete(DeleteABooking);

module.exports = router;
