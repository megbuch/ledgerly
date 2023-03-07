import React, { useState } from "react";
import * as incomesAPI from "../../utilities/incomes-api";

export default function IncomeForm() {
  const [incomeFormData, setIncomeFormData] = useState({
    description: "",
    amount: "",
    category: "",
    account: "",
    date: "",
    notes: "",
  });

  const handleChange = (event) => {
    setIncomeFormData({
      ...incomeFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const income = await incomesAPI.createIncome(incomeFormData);
      console.log("Income saved:", income);
    } catch (err) {
      console.error("Error saving income:", err);
    }
  };

  return (
    <>
      <h3>Add Income</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={incomeFormData.description}
          onChange={handleChange}
          required
        />
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={incomeFormData.amount}
          onChange={handleChange}
          required
        />
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={incomeFormData.category}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          {["Sales", "Uncategorized Income"].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <label htmlFor="account">Account</label>
        <select
          id="account"
          name="account"
          value={incomeFormData.account}
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
          value={incomeFormData.date}
          onChange={handleChange}
          required
        />
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={incomeFormData.notes}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
