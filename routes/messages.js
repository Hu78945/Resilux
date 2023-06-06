const router = require("express").Router();
const {getMessage} = require('../controllers/messagesController');
const {createMessages} = require('../controllers/messagesController');
const {deleteMessages} = require('../controllers/messagesController');

router.route('/:id').get(getMessage).delete(deleteMessages);
router.route('/').post(createMessages);

module.exports = router;