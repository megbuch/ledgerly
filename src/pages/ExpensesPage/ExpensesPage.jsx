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
  const [selectedDateRange, setSelectedDateRange] = useState({});
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [filteredExpenses, setFilteredExpenses] = useState([]);

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

  useEffect(() => {
    let filteredExpenses = expenses.filter((expense) => {
      if (selectedCategory !== "" && expense.category !== selectedCategory) {
        return false;
      }

      if (
        selectedDateRange.startDate !== "" &&
        selectedDateRange.endDate !== ""
      ) {
        const expenseDate = new Date(expense.date);
        const startDate = new Date(selectedDateRange.startDate);
        const endDate = new Date(selectedDateRange.endDate);

        if (expenseDate < startDate || expenseDate > endDate) {
          return false;
        }
      }

      return true;
    });

    let total = 0;
    for (let i = 0; i < filteredExpenses.length; i++) {
      total += filteredExpenses[i].amount;
    }
    setTotalExpenses(total);
    setFilteredExpenses(filteredExpenses);
  }, [expenses, selectedCategory, selectedDateRange]);

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
      <div className="row">
        <h1>Expenses</h1>
        <button className="add-btn" onClick={handleToggleModal}>
          <i class="fa-solid fa-plus"></i> Add Expense
        </button>
      </div>
      <ExpensesFilterForm
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedDateRange={selectedDateRange}
        setSelectedDateRange={setSelectedDateRange}
      />
      <div>
        <div className="row">
          <h3>Your Expenses</h3>
          <p>
            Total Expenses: <strong>${totalExpenses}</strong>
          </p>
        </div>
        <ul>
          {filteredExpenses.map((expense) => (
            <div key={expense._id} className="card">
              <div className="red-bar"></div>
              <div className="row">
                <div className="row">
                  <p>
                    <strong>{expense.description}</strong>
                  </p>
                  <p>${expense.amount}</p>
                </div>
                <div className="edit-delete-btns">
                  <button onClick={() => handleDelete(expense._id)}>
                    <i class="fa-solid fa-trash"></i>
                  </button>
                  <button onClick={() => handleEdit(expense)}>
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                </div>
              </div>
              <div className="row">
                <p>
                  <i class="fa-solid fa-calendar"></i>&nbsp;
                  {expense.date.slice(0, 10)}
                </p>
                <p>
                  <i class="fa-solid fa-folder"></i>&nbsp;{expense.category}
                </p>
                <p>
                  <i class="fa-solid fa-receipt"></i>&nbsp;{expense.account}
                </p>
                {expense.notes ? (
                  <p>
                    <i class="fa-solid fa-comment"></i>&nbsp;{expense.notes}
                  </p>
                ) : null}
              </div>
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
              expenses={expenses}
              setExpenses={setExpenses}
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
