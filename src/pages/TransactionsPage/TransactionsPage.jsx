import { useState, useEffect } from "react";
import { useRef } from "react";
import * as expensesAPI from "../../utilities/expenses-api";
import * as incomesAPI from "../../utilities/incomes-api";
import TransactionsFilterForm from "../../components/TransactionsFilterForm/TransactionsFilterForm";
import ReactToPrint from "react-to-print";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState({});
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const componentRef = useRef(null);

  const categories = ["All Categories"];
  for (let i = 0; i < transactions.length; i++) {
    if (!categories.includes(transactions[i].category)) {
      categories.push(transactions[i].category);
    }
  }

  const incomeTotal = filteredTransactions
    .filter((transaction) => !transaction.isExpense)
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expensesTotal = filteredTransactions
    .filter((transaction) => transaction.isExpense)
    .reduce((total, transaction) => total + transaction.amount, 0);

  const cashFlow = incomeTotal - expensesTotal;

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

    let total = 0;
    for (let i = 0; i < filteredTransactions.length; i++) {
      total += filteredTransactions[i].amount;
    }

    setFilteredTransactions(filteredTransactions);
  }, [transactions, selectedCategory, selectedDateRange]);

  return (
    <div className="TransactionsPage" ref={componentRef}>
      <div className="row">
        <h1>Transactions</h1>
        <ReactToPrint
          trigger={() => (
            <button className="add-btn">
              Generate Financial Report&nbsp;&nbsp;
              <i class="fa-solid fa-print"></i>
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
        <h3>Your Transactions</h3>
        <div className="row">
          <p>
            Income: <strong>${incomeTotal}</strong>
          </p>
          <p>
            Expenses: <strong>${expensesTotal}</strong>
          </p>
          <p>
            Cash Flow:{" "}
            <strong style={{ color: cashFlow <= 0 ? "#eb3c3c" : "#40b94a" }}>
              ${cashFlow}
            </strong>
          </p>
        </div>
        <ul>
          {transactions
            .filter((transaction) => {
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
            })
            .map((transaction) => (
              <div key={transaction._id} className="card">
                <div
                  className={`${
                    transaction.isExpense ? "red-bar" : "green-bar"
                  }`}
                ></div>
                <div className="row">
                  <div className="row">
                    <p>
                      <strong>{transaction.description}</strong>
                    </p>
                    <p>${transaction.amount}</p>
                  </div>
                </div>
                <div className="row">
                  <p>
                    <i class="fa-solid fa-calendar"></i>&nbsp;
                    {transaction.date.slice(0, 10)}
                  </p>
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
