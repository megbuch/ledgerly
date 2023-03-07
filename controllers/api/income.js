const Income = require("../../models/income");

module.exports = { create };

async function create(req, res) {
  const income = new Income({
    description: req.body.description,
    amount: req.body.amount,
    category: req.body.category,
    account: req.body.account,
    date: req.body.date,
    notes: req.body.notes,
    user: req.user._id
  });

  try {
    const savedIncome = await income.save();
    res.json(savedIncome);
  } catch (err) {
    res.status(400).json(err);
  }
}
