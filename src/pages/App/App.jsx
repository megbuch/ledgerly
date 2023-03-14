import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import AuthPage from "../AuthPage/AuthPage";
import DashboardPage from "../DashboardPage/DashboardPage";
import TransactionsPage from "../TransactionsPage/TransactionsPage";
import IncomesPage from "../IncomesPage/IncomesPage";
import ExpensesPage from "../ExpensesPage/ExpensesPage";
import Navigation from "../../components/Navigation/Navigation";

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      {user ? (
        <>
          <Navigation user={user} setUser={setUser} />
          <Routes className="Routes">
            <Route path="/" element={<DashboardPage user={user} />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/income" element={<IncomesPage />} />
            <Route path="/expenses" element={<ExpensesPage />} />
          </Routes>
        </>
      ) : (
        <div className="AuthPage">
          <AuthPage setUser={setUser} />
        </div>
      )}
    </main>
  );
}
