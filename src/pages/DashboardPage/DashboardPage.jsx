import "./DashboardPage.css";

export default function DashboardPage({ user }) {
  return (
    <div className="Dashboard">
      <h2>Welcome to Ledgerly, {user.name}</h2>
      <h1>{user.businessName}</h1>
    </div>
  );
}
