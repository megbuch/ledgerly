import { useState, useEffect } from "react";
import * as expensesAPI from "../../utilities/expenses-api";
import * as incomesAPI from "../../utilities/incomes-api";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const [incomesData, expensesData] = await Promise.all([
          incomesAPI.getIncomes(),
          expensesAPI.getExpenses(),
        ]);
        const mergedTransactions = [...incomesData, ...expensesData];
        mergedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
        setTransactions(mergedTransactions);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTransactions();
  }, []);

  return (
    <div className="TransactionsPage">
      <h1>Transactions</h1>
      <div>
        <h3>Your Transactions</h3>
        <ul>
          {transactions.map((transaction) => (
            <div key={transaction._id} className="card">
              <p>
                <strong>{transaction.description}</strong>
                <span>${transaction.amount}</span>
              </p>
              <p>{new Date(transaction.date).toLocaleDateString()}</p>
              <p>{transaction.category}</p>
              <p>{transaction.account}</p>
              <p>{transaction.notes}</p>
              <button>
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
