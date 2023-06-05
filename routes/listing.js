const router = require("express").Router();
const {getListings} = require('../controllers/listingController');
const {updateListings} = require('../controllers/listingController')

router.route('/:id').get(getListings).put(updateListings);


module.exports = router;