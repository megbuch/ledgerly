const Income = require("../../models/income");

module.exports = {
  create,
  index,
  delete: deleteIncome,
};

async function create(req, res) {
  const income = new Income({
    description: req.body.description,
    amount: req.body.amount,
    category: req.body.category,
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
      createdAt: -1,
    });
    res.json(incomes);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error: "Internal Server Error: Failed to retrieve list of incomes.",
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
      success: true,
      message: "Income deleted successfully",
      income: deletedIncome,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}
