const Income = require("../../models/income");

module.exports = {
  create,
  index,
  delete: deleteIncome,
  update,
};

async function create(req, res) {
  const income = new Income({
    description: req.body.description,
    amount: req.body.amount,
    category: req.body.category,
    date: req.body.date,
    account: req.body.account,
    notes: req.body.notes,
    user: req.user._id,
  });

  try {
    const savedIncome = await income.save();
    res.json(savedIncome);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function index(req, res) {
  try {
    const incomes = await Income.find({ user: req.user._id }).sort({
      date: -1,
    });
    res.json(incomes);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to retrieve list of incomes",
    });
  }
}

async function deleteIncome(req, res) {
  try {
    const deletedIncome = await Income.findByIdAndDelete(req.params.id);
    if (!deletedIncome) {
      return res.status(404).json({ error: "Income not found" });
    }
    res.json({
      message: "Income deleted successfully",
      income: deletedIncome,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting income" });
  }
}

async function update(req, res) {
  try {
    const income = await Income.findById(req.params.id);
    income.description = req.body.description;
    income.amount = req.body.amount;
    income.category = req.body.category;
    income.date = req.body.date;
    income.account = req.body.account;
    income.notes = req.body.notes;
    const updatedIncome = await income.save();
    res.json(updatedIncome);
  } catch (error) {
    res.status(500).json({ error: "Error updating income" });
  }
}
