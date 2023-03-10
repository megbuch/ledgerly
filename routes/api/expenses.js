const express = require('express');
const router = express.Router();
const expensesCtrl = require('../../controllers/api/expenses');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.post('/', ensureLoggedIn, expensesCtrl.create);
router.get('/', ensureLoggedIn, expensesCtrl.index)
router.delete('/:id', ensureLoggedIn, expensesCtrl.delete);
router.put('/:id', ensureLoggedIn, expensesCtrl.update);

module.exports = router;
