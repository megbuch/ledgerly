import IncomeForm from "../../components/IncomeForm/IncomeForm";
import IncomesFilterForm from "../../components/IncomesFilterForm/IncomesFilterForm";
import IncomesList from "../../components/IncomesList/IncomesList";
import "./IncomesPage.css";

export default function IncomePage() {
  return (
    <div className="IncomePage">
      <h1>Income</h1>
      <IncomeForm />
      <IncomesFilterForm />
      <IncomesList />
    </div>
  );
}
