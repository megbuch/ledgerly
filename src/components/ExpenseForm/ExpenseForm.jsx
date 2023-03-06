import React, { useState } from "react";
import * as expensesAPI from "../../utilities/expenses-api";

export default function ExpenseForm() {
  const [expenseFormData, setExpenseFormData] = useState({
    description: "",
    amount: "",
    category: "",
    account: "",
    date: "",
    notes: "",
  });

  const handleChange = (event) => {
    setExpenseFormData({
      ...expenseFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const expense = await expensesAPI.createExpense(expenseFormData);
      console.log("Expense saved:", expense);
    } catch (err) {
      console.error("Error saving expense:", err);
    }
  };

  return (
    <>
      <h3>Add an Expense</h3>
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

        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={expenseFormData.date}
          onChange={handleChange}
          required
        />

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
