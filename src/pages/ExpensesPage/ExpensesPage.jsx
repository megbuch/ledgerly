import { useState, useEffect } from "react";
import * as expensesAPI from "../../utilities/expenses-api";
import ExpenseForm from "../../components/ExpenseForm/ExpenseForm";
import ExpensesFilterForm from "../../components/ExpensesFilterForm/ExpensesFilterForm";
import "./ExpensesPage.css";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
      setShowModal(false);
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

  function toggleExpenseForm() {
    setShowModal((prevShowModal) => !prevShowModal);
  }

  return (
    <div className="ExpensesPage">
      <h1>Expenses</h1>
      <ExpensesFilterForm />
      <button onClick={toggleExpenseForm}><i class="fa-solid fa-plus"></i> Add Expense</button>
      <div>
        <h3>Your Expenses</h3>
        <ul>
          {expenses.map((expense) => (
            <div key={expense._id} className="card">
              <p>
                <strong>{expense.description}</strong>
                <span>
                  <i class="fa-solid fa-dollar-sign"></i> {expense.amount}
                </span>
              </p>
              <p>
                <i class="fa-solid fa-calendar"></i>{" "}
                {new Date(expense.date).toLocaleDateString()}
              </p>
              <p>
                <i class="fa-solid fa-folder"></i> {expense.category}
              </p>
              <p>
                <i class="fa-solid fa-receipt"></i> {expense.account}
              </p>
              <p>
                <i class="fa-solid fa-comment"></i> {expense.notes}
              </p>
              <button onClick={() => handleDelete(expense._id)}>
                <i class="fa-solid fa-trash"></i>
              </button>
              <button>
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
            </div>
          ))}
        </ul>
      </div>

      {showModal ? (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleExpenseForm}>
              &times;
            </span>
            <ExpenseForm addExpense={addExpense} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
