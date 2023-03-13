import { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";

export default function AuthPage({ setUser }) {
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  return (
    <main>
      <h1>{showSignUpForm ? "Sign Up" : "Log In"}</h1>
      {showSignUpForm ? (
        <SignUpForm setUser={setUser} />
      ) : (
        <LoginForm setUser={setUser} />
      )}
      <Link onClick={() => setShowSignUpForm(!showSignUpForm)}>
        {showSignUpForm ? "Already a user? Log in here." : "New to Ledgerly? Sign up here."}
      </Link>
    </main>
  );
}