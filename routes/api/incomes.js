const express = require('express');
const router = express.Router();
const incomesCtrl = require('../../controllers/api/incomes');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.post('/', ensureLoggedIn, incomesCtrl.create);
router.get('/', incomesCtrl.index);

module.exports = router;
