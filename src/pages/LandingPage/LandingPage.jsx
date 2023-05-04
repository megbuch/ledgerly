import { Link } from "react-router-dom";
import HeroImage from "../../assets/images/woman.jpg";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="LandingPage">
      <div className="hero-container">
        <div className="text-container">
          <h1 className="ledgerly">Ledgerly</h1>
          <h2>Giving you the tools to financial freedom.</h2>
          <Link to="/login">
            log in / sign up&nbsp;&nbsp;<i class="fa-solid fa-arrow-right"></i>
          </Link>
          <div className="about">
            <div className="info-card">
              <h3>Manage Your Finances</h3>
              <p>Categorize and track your income & expenses with ease.</p>
            </div>
            <div className="info-card">
              <h3>See Your Cash Flow</h3>
              <p>Filter transactions by category and date range.</p>
            </div>
            <div className="info-card">
              <h3>Print Financial Reports</h3>
              <p>Take your financial data with you wherever you go.</p>
            </div>
          </div>
        </div>
        <img className="hero" src={HeroImage} />
      </div>
    </div>
  );
}
