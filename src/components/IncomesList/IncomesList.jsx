import { useState, useEffect } from "react";
import * as incomesAPI from "../../utilities/incomes-api";

export default function IncomesList() {
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    async function fetchIncomes() {
      try {
        const data = await incomesAPI.getIncomes();
        console.log(data);
        setIncomes(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchIncomes();
  }, []);

  return (
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
  );
}
