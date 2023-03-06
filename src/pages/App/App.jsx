import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import AuthPage from "../AuthPage/AuthPage";
import DashboardPage from "../DashboardPage/DashboardPage";
import TransactionsPage from "../TransactionsPage/TransactionsPage";
import IncomePage from "../IncomePage/IncomePage";
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
            <Route path="/" element={<DashboardPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/income" element={<IncomePage />} />
            <Route path="/expenses" element={<ExpensesPage />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
