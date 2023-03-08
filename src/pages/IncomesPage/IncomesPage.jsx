import IncomeForm from "../../components/IncomeForm/IncomeForm";
import IncomesFilterForm from "../../components/IncomesFilterForm/IncomesFilterForm";
import { useState, useEffect } from "react";
import * as incomesAPI from "../../utilities/incomes-api";
import "./IncomesPage.css";

export default function IncomePage() {
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    async function fetchIncomes() {
      try {
        const data = await incomesAPI.getIncomes();
        setIncomes(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchIncomes();
  }, []);

  return (
    <div className="IncomePage">
      <h1>Income</h1>
      <IncomeForm />
      <IncomesFilterForm />
      <div>
      <h3>Your Income</h3>
      <ul>
        {incomes.map((income) => (
          <div key={income._id} className="card">
            <p><strong>{income.description}</strong>
              <span>${income.amount}</span>
            </p>
            <p>{new Date(income.date).toLocaleDateString()}</p>
            <p>{income.category}</p>
            <p>{income.account}</p>
            <p>{income.notes}</p>
            <button>x</button>
          </div>
        ))}
      </ul>
    </div>
    </div>
  );
}
