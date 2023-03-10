import { useState, useEffect } from "react";
import * as expensesAPI from "../../utilities/expenses-api";
import ExpenseForm from "../../components/ExpenseForm/ExpenseForm";
import ExpensesFilterForm from "../../components/ExpensesFilterForm/ExpensesFilterForm";
import "./ExpensesPage.css";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = ["All Categories"];
  for (let i = 0; i < expenses.length; i++) {
    if (!categories.includes(expenses[i].category)) {
      categories.push(expenses[i].category);
    }
  }

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

  function handleToggleModal() {
    setShowModal((prevShowModal) => !prevShowModal);
    setSelectedExpense(null);
  }

  function handleEdit(expense) {
    setSelectedExpense(expense);
    setShowModal(true);
  }

  return (
    <div className="ExpensesPage">
      <h1>Expenses</h1>
      <ExpensesFilterForm
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <button onClick={handleToggleModal}>
        <i class="fa-solid fa-plus"></i> Add Expense
      </button>
      <div>
        <h3>Your Expenses</h3>
        <ul>
          {expenses
            .filter(
              (expense) =>
                selectedCategory === "" || expense.category === selectedCategory
            )
            .map((expense) => (
              <div key={expense._id} className="card">
                <p>
                  <strong>{expense.description}</strong>
                  <span>
                    <i class="fa-solid fa-dollar-sign"></i> {expense.amount}
                  </span>
                </p>
                <p>
                  <i class="fa-solid fa-calendar"></i>
                  {new Date(expense.createdAt).toLocaleDateString()}
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
                <button onClick={() => handleEdit(expense)}>
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
              </div>
            ))}
        </ul>
      </div>

      {showModal ? (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleToggleModal}>
              &times;
            </span>
            <ExpenseForm
              addExpense={addExpense}
              selectedExpense={selectedExpense}
              setSelectedExpense={setSelectedExpense}
              setShowModal={setShowModal}
            />
          </div>
        </div>
      ) : (
        false
      )}
    </div>
  );
}
