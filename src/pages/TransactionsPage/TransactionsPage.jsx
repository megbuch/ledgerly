import { useState, useEffect } from "react";
import { useRef } from "react";
import * as expensesAPI from "../../utilities/expenses-api";
import * as incomesAPI from "../../utilities/incomes-api";
import TransactionsFilterForm from "../../components/TransactionsFilterForm/TransactionsFilterForm";
import ReactToPrint from "react-to-print";
import "./TransactionsPage.css";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState({});
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const componentRef = useRef(null);

  const categories = ["All Categories"];
  for (let i = 0; i < transactions.length; i++) {
    if (!categories.includes(transactions[i].category)) {
      categories.push(transactions[i].category);
    }
  }

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const [incomesData, expensesData] = await Promise.all([
          incomesAPI.getIncomes(),
          expensesAPI.getExpenses(),
        ]);
        const mergedTransactions = [
          ...incomesData.map((transaction) => ({
            ...transaction,
            isExpense: false,
          })),
          ...expensesData.map((transaction) => ({
            ...transaction,
            isExpense: true,
          })),
        ];
        mergedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
        setTransactions(mergedTransactions);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTransactions();
  }, []);

  useEffect(() => {
    let filteredTransactions = transactions.filter((transaction) => {
      if (
        selectedCategory !== "" &&
        transaction.category !== selectedCategory
      ) {
        return false;
      }

      if (
        selectedDateRange.startDate !== "" &&
        selectedDateRange.endDate !== ""
      ) {
        const transactionDate = new Date(transaction.date);
        const startDate = new Date(selectedDateRange.startDate);
        const endDate = new Date(selectedDateRange.endDate);

        if (transactionDate < startDate || transactionDate > endDate) {
          return false;
        }
      }

      return true;
    });

    setFilteredTransactions(filteredTransactions);
  }, [transactions, selectedCategory, selectedDateRange]);

  let total = 0;
  for (let i = 0; i < filteredTransactions.length; i++) {
    total += filteredTransactions[i].amount;
  }

  const incomeTotal = filteredTransactions
    .filter((transaction) => !transaction.isExpense)
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expensesTotal = filteredTransactions
    .filter((transaction) => transaction.isExpense)
    .reduce((total, transaction) => total + transaction.amount, 0);

  const cashFlow = incomeTotal - expensesTotal;

  function handleCardClick(id) {
    if (expandedCard === id) {
      setExpandedCard(null);
    } else {
      setExpandedCard(id);
    }
  }

  return (
    <div className="TransactionsPage" ref={componentRef}>
      <h1 className="heading">Transactions</h1>
      <div className="row">
        <h1>
          Income: <span>${incomeTotal}</span>
        </h1>
        <h1>
          Expenses: <span>${expensesTotal}</span>
        </h1>
        <h1>
          Cash Flow:{" "}
          <span className={`${cashFlow <= 0 ? "red" : "green"}`}>
            ${cashFlow}
          </span>
        </h1>
        <ReactToPrint
          trigger={() => (
            <button id="print">
              Print PDF&nbsp;&nbsp;<i class="fa-solid fa-print"></i>
            </button>
          )}
          content={() => componentRef.current}
        />
      </div>
      <TransactionsFilterForm
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedDateRange={selectedDateRange}
        setSelectedDateRange={setSelectedDateRange}
      />
      <div>
        <ul className="cards-ctr">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction._id}
              onClick={() => handleCardClick(transaction._id)}
              className={`card ${
                expandedCard === transaction._id ? "card-expanded" : ""
              }`}
            >
              <div
                className={`${transaction.isExpense ? "red-bar" : "green-bar"}`}
              ></div>
              <div className="row">
                <div className="card-main row">
                  <div>
                    <p className="large">{transaction.description}</p>
                    <p>
                      <i class="fa-solid fa-calendar"></i>&nbsp;
                      {transaction.date.slice(0, 10)}
                    </p>
                  </div>
                  <p className="large">${transaction.amount}</p>
                </div>
              </div>
              <div className="row expanded">
                <p>
                  <i class="fa-solid fa-folder"></i>&nbsp;
                  {transaction.category}
                </p>
                <p>
                  <i class="fa-solid fa-receipt"></i>&nbsp;
                  {transaction.account}
                </p>
                {transaction.notes ? (
                  <p>
                    <i class="fa-solid fa-comment"></i>&nbsp;
                    {transaction.notes}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
