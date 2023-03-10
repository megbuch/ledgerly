const express = require('express');
const router = express.Router();
const incomesCtrl = require('../../controllers/api/incomes');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.post('/', ensureLoggedIn, incomesCtrl.create);
router.get('/', ensureLoggedIn, incomesCtrl.index);
router.delete('/:id', ensureLoggedIn, incomesCtrl.delete);
router.put('/:id', ensureLoggedIn, incomesCtrl.update);

module.exports = router;
