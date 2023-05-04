import { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import "./AuthPage.css";

export default function AuthPage({ setUser }) {
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  return (
    <div className="AuthPage">
      <h1 className="ledgerly">Ledgerly</h1>
      <h3>{showSignUpForm ? "Welcome to Ledgerly" : "Welcome back!"}</h3>
      {showSignUpForm ? (
        <SignUpForm setUser={setUser} />
      ) : (
        <LoginForm setUser={setUser} />
      )}
      <Link onClick={() => setShowSignUpForm(!showSignUpForm)}>
        {showSignUpForm
          ? "Already a user? Log in here."
          : "New to Ledgerly? Sign up here."}
      </Link>
    </div>
  );
}
