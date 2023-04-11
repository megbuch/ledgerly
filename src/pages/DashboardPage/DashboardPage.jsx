import "./DashboardPage.css";

export default function DashboardPage({ user }) {
  return (
    <div className="Dashboard">
      <h1>
        Welcome to Ledgerly, <span>{user.name}</span>
      </h1>
      <h2>{user.businessName}</h2>
    </div>
  );
}
