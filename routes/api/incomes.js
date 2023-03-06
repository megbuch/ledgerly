const express = require('express');
const router = express.Router();
const incomeCtrl = require('../../controllers/api/incomes');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.post('/', ensureLoggedIn, incomeCtrl.create);

module.exports = router;
