const jwt = require("jsonwebtoken");
const Income = require("../../models/income");

module.exports = { create };

async function create(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.SECRET);
  const userId = decoded.user._id;

  console.log(userId);

  const income = new Income({
    description: req.body.description,
    amount: req.body.amount,
    category: req.body.category,
    account: req.body.account,
    date: req.body.date,
    notes: req.body.notes,
    user: userId,
  });

  try {
    const savedIncome = await income.save();
    res.json(savedIncome);
  } catch (err) {
    res.status(400).json(err);
  }
}
