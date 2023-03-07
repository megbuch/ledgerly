import ExpenseForm from "../../components/ExpenseForm/ExpenseForm";
import ExpensesList from "../../components/ExpensesList/ExpensesList";
import ExpensesFilterForm from "../../components/ExpensesFilterForm/ExpensesFilterForm";
import './ExpensesPage.css';

export default function ExpensesPage() {
  return (
    <div className="ExpensesPage">
      <h1>Expenses</h1>
      <ExpenseForm />
      <ExpensesFilterForm />
      <ExpensesList />
    </div>
  );
}
