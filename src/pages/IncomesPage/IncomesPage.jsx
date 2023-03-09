import { useState, useEffect } from "react";
import * as incomesAPI from "../../utilities/incomes-api";
import IncomeForm from "../../components/IncomeForm/IncomeForm";
import IncomesFilterForm from "../../components/IncomesFilterForm/IncomesFilterForm";
import "./IncomesPage.css";

export default function IncomesPage() {
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

  async function addIncome(income) {
    setIncomes((prevIncomes) => [...prevIncomes, income]);
    try {
      const data = await incomesAPI.getIncomes();
      setIncomes(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(incomeId) {
    try {
      await incomesAPI.deleteIncome(incomeId);
      const data = await incomesAPI.getIncomes();
      setIncomes(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="IncomePage">
      <h1>Income</h1>
      <IncomeForm addIncome={addIncome} />
      <IncomesFilterForm />
      <div>
        <h3>Your Income</h3>
        <ul>
          {incomes.map((income) => (
            <div key={income._id} className="card">
              <p>
                <strong>{income.description}</strong>
                <span><i class="fa-solid fa-dollar-sign"></i> {income.amount}</span>
              </p>
              <p><i class="fa-solid fa-calendar"></i> {new Date(income.date).toLocaleDateString()}</p>
              <p><i class="fa-solid fa-folder"></i> {income.category}</p>
              <p><i class="fa-solid fa-receipt"></i> {income.account}</p>
              <p><i class="fa-solid fa-comment"></i> {income.notes}</p>
              <button onClick={() => handleDelete(income._id)}>
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
