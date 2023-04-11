import { useState, useEffect } from "react";
import * as expensesAPI from "../../utilities/expenses-api";

export default function ExpenseForm({
  expenses,
  setExpenses,
  addExpense,
  selectedExpense,
  setSelectedExpense,
  setShowModal,
}) {
  const [expenseFormData, setExpenseFormData] = useState(() => {
    if (selectedExpense) {
      return {
        description: selectedExpense.description,
        amount: selectedExpense.amount,
        category: selectedExpense.category,
        date: selectedExpense.date,
        account: selectedExpense.account,
        notes: selectedExpense.notes,
      };
    } else {
      return {
        description: "",
        amount: "",
        category: "",
        date: "",
        account: "",
        notes: "",
      };
    }
  });

  useEffect(() => {
    if (selectedExpense) {
      setExpenseFormData(selectedExpense);
    }
  }, [selectedExpense]);

  async function handleChange(event) {
    setExpenseFormData({
      ...expenseFormData,
      [event.target.name]: event.target.value,
    });
  }

  async function updateExpense(updatedExpense) {
    try {
      const updatedExpenses = expenses.map((expense) => {
        if (expense._id === updatedExpense._id) {
          return { ...updatedExpense };
        } else {
          return expense;
        }
      });
      setExpenses(updatedExpenses);
    } catch (err) {
      console.error("Error updating expense", err);
    }
  }

  async function handleUpdate(expenseFormData) {
    try {
      const updatedExpense = await expensesAPI.updateExpense(
        selectedExpense._id,
        { ...expenseFormData }
      );
      updateExpense(updatedExpense);
      console.log("Expense updated:", updatedExpense);
      setExpenseFormData({
        description: "",
        amount: "",
        category: "",
        date: "",
        account: "",
        notes: "",
      });
      setShowModal(false);
      setSelectedExpense(null);
    } catch (err) {
      console.error("Error updating expense:", err);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (selectedExpense) {
      handleUpdate(expenseFormData);
    } else {
      try {
        const expense = await expensesAPI.createExpense(expenseFormData);
        console.log("Expense saved:", expense);
        addExpense(expense);
        setExpenseFormData({
          description: "",
          amount: "",
          category: "",
          date: "",
          account: "",
          notes: "",
        });
        setShowModal(false);
        setSelectedExpense(null);
      } catch (err) {
        console.error("Error saving expense:", err);
      }
    }
  }

  return (
    <>
      <h3>{selectedExpense ? "Edit Expense" : "Add an Expense"}</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={expenseFormData.description}
          onChange={handleChange}
          required
        />
        <label htmlFor="amount">Amount</label>
        <input
          placeholder="$"
          type="number"
          id="amount"
          name="amount"
          value={expenseFormData.amount}
          onChange={handleChange}
          required
        />
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={expenseFormData.category}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          {[
            "Accounting Fees",
            "Advertising & Promotion",
            "Computer Expense",
            "Depreciation Expense",
            "Interest Expense",
            "Meals & Entertainment",
            "Office Supplies",
            "Payroll Expense",
            "Professional Fees",
            "Rent Expense",
            "Repairs & Maintenance",
            "Telephone",
            "Travel Expense",
            "Utilities",
            "Vehicle Expense",
          ].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={
            expenseFormData.date
              ? new Date(expenseFormData.date).toISOString().slice(0, 10)
              : ""
          }
          onChange={handleChange}
          required
        />
        <label htmlFor="account">Account</label>
        <select
          id="account"
          name="account"
          value={expenseFormData.account}
          onChange={handleChange}
        >
          <option value="">Select an account</option>
          <option value="Checking">Checking</option>
          <option value="Savings">Savings</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Cash">Cash</option>
        </select>
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={expenseFormData.notes}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
