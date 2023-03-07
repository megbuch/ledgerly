import { useState, useEffect } from "react";
import * as expensesAPI from "../../utilities/expenses-api";

export default function ExpensesList({ addExpense }) {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const data = await expensesAPI.getExpenses();
        console.log(data);
        setExpenses(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchExpenses();
  }, []);

  return (
    <div>
      <h3>Your Expenses</h3>
      <ul>
        {expenses.map((expense) => (
          <div key={expense._id} className="card">
            <p><strong>{expense.description}</strong>
              <span>${expense.amount}</span>
            </p>
            <p>{new Date(expense.date).toLocaleDateString()}</p>
            <p>{expense.category}</p>
            <p>{expense.account}</p>
            <p>{expense.notes}</p>
          </div>
        ))}
      </ul>
    </div>
  );
}
