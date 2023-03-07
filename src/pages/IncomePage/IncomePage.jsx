import IncomeForm from "../../components/IncomeForm/IncomeForm";
import IncomeFilterForm from "../../components/IncomeFilterForm/IncomeFilterForm";
import IncomeList from "../../components/IncomeList/IncomeList";
import "./IncomePage.css";

export default function IncomePage() {
  return (
    <div className="IncomePage">
      <h1>Income</h1>
      <IncomeForm />
      <IncomeFilterForm />
      <IncomeList />
    </div>
  );
}
