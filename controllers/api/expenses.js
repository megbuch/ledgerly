const Expense = require("../../models/expense");

module.exports = { create };

async function create(req, res) {
  const expense = new Expense({
    description: req.body.description,
    amount: req.body.amount,
    category: req.body.category,
    account: req.body.account,
    date: req.body.date,
    notes: req.body.notes,
    user: req.user._id
  });

  try {
    const savedExpense = await expense.save();
    res.json(savedExpense);
  } catch (err) {
    res.status(400).json(err);
  }
}
