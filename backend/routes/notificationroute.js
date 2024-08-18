const express = require('express');
const router = express.Router();

const {broadcast,sendnot} = require('../controllers/notificationsController');
router.post('/send', sendnot);
router.post('/broadcast',broadcast)

module.exports = router;


module.exports = router;
