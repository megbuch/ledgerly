import { useState, useEffect } from "react";
import * as expensesAPI from "../../utilities/expenses-api";
import ExpenseForm from "../../components/ExpenseForm/ExpenseForm";
import ExpensesFilterForm from "../../components/ExpensesFilterForm/ExpensesFilterForm";
import "./ExpensesPage.css";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const data = await expensesAPI.getExpenses();
        setExpenses(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchExpenses();
  }, []);

  async function addExpense(expense) {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
    try {
      const data = await expensesAPI.getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(expenseId) {
    try {
      await expensesAPI.deleteExpense(expenseId);
      const data = await expensesAPI.getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="ExpensesPage">
      <h1>Expenses</h1>
      <ExpenseForm addExpense={addExpense} />
      <ExpensesFilterForm />
      <div>
        <h3>Your Expenses</h3>
        <ul>
          {expenses.map((expense) => (
            <div key={expense._id} className="card">
              <p>
                <strong>{expense.description}</strong>
                <span>${expense.amount}</span>
              </p>
              <p>{new Date(expense.date).toLocaleDateString()}</p>
              <p>{expense.category}</p>
              <p>{expense.account}</p>
              <p>{expense.notes}</p>
              <button onClick={() => handleDelete(expense._id)}>x</button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
