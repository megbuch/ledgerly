const Expense = require("../../models/expense");

module.exports = {
  create,
  index,
  delete: deleteExpense,
};

async function create(req, res) {
  const expense = new Expense({
    description: req.body.description,
    amount: req.body.amount,
    category: req.body.category,
    account: req.body.account,
    date: req.body.date,
    notes: req.body.notes,
    user: req.user._id,
  });
  try {
    const savedExpense = await expense.save();
    res.json(savedExpense);
  } catch (err) {
    res.status(400).json({ error: "Error submitting expense form." });
  }
}

async function index(req, res) {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({
      date: -1,
    });
    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error: Failed to retrieve list of expenses.",
    });
  }
}

async function deleteExpense(req, res) {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
    if (!deletedExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.json({
      success: true,
      message: "Expense deleted successfully",
      expense: deletedExpense,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}
