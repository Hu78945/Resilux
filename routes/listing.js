const router = require("express").Router();
const {getListings} = require('../controllers/listingController');
const {updateListings} = require('../controllers/listingController');
const {deleteListing} = require('../controllers/listingController');
const {createlisting} = require('../controllers/listingController');

router.route('/:id').get(getListings).put(updateListings).delete(deleteListing).post(createlisting);


module.exports = router;