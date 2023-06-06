const router = require("express").Router();

const {
  createAmenties,
  getAllAmentiesFromAListing,
  UpdateAmenties,
} = require("../controllers/amentiesController");

router.route("/").post(createAmenties);
router.route("/:id").get(getAllAmentiesFromAListing).put(UpdateAmenties);

module.exports = router;
