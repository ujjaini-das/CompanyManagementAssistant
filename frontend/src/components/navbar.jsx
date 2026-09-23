import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <Link
        to="/dashboard"
        className="logo"
      >
        AI Company Assistant
      </Link>

      <div className="navbar-right">

        <span className="user-name">
          Welcome 👋
        </span>

        <Link
          to="/login"
          className="logout-button"
        >
          Logout
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;