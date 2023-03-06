const express = require('express');
const router = express.Router();
const expensesCtrl = require('../../controllers/api/expenses');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.post('/', ensureLoggedIn, expensesCtrl.create);

module.exports = router;
