import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-title">
        MENU
      </div>

      <NavLink
        to="/dashboard"
        className="sidebar-link"
      >
        🏠 Dashboard
      </NavLink>

      <NavLink
        to="/dashboard"
        className="sidebar-link"
      >
        👥 Employees
      </NavLink>

      <NavLink
        to="/dashboard"
        className="sidebar-link"
      >
        📁 Projects
      </NavLink>

      <NavLink
        to="/dashboard"
        className="sidebar-link"
      >
        ✓ Tasks
      </NavLink>

      <NavLink
        to="/dashboard"
        className="sidebar-link"
      >
        🤖 AI Assistant
      </NavLink>

    </aside>
  );
}

export default Sidebar;