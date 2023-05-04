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
import LandingPage from "../LandingPage/LandingPage";

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <>
      {user ? (
        <main className="App">
          <Navigation user={user} setUser={setUser} />
          <Routes className="Routes">
            <Route path="/dashboard" element={<DashboardPage user={user} />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/income" element={<IncomesPage />} />
            <Route path="/expenses" element={<ExpensesPage />} />
          </Routes>
        </main>
      ) : (
        <main className="App">
          <Routes className="Routes">
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<AuthPage setUser={setUser} />} />
          </Routes>
        </main>
      )}
    </>
  );
}
