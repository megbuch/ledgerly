import { useState, useEffect } from "react";
import * as expensesAPI from "../../utilities/expenses-api";
import * as incomesAPI from "../../utilities/incomes-api";
import TransactionsFilterForm from "../../components/ExpensesFilterForm/ExpensesFilterForm";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState({});
  const [filteredTransactions, setFilteredTransactions] = useState([]);

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
    <div className="TransactionsPage">
      <h1>Transactions</h1>
      <TransactionsFilterForm
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedDateRange={selectedDateRange}
        setSelectedDateRange={setSelectedDateRange}
      />
      <div>
        <h3>Your Transactions</h3>
        <p>
          Income: <strong>${incomeTotal}</strong>
          Expenses: <strong>$-{expensesTotal}</strong>
          Cash Flow: <strong>${cashFlow}</strong>
        </p>
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
                <p>
                  <strong>{transaction.description}</strong>
                  <span>
                    <i class="fa-solid fa-dollar-sign"></i> {transaction.amount}
                  </span>
                </p>
                <p>
                  <i class="fa-solid fa-calendar"></i>
                  {transaction.date.slice(0, 10)}
                </p>
                <p>
                  <i class="fa-solid fa-folder"></i> {transaction.category}
                </p>
                <p>
                  <i class="fa-solid fa-receipt"></i> {transaction.account}
                </p>
                {transaction.notes ? (
                  <p>
                    <i class="fa-solid fa-comment"></i> {transaction.notes}
                  </p>
                ) : null}
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
}
