import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/employees.css";

export default function Employees() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Rahul Kumar",
      email: "rahul@example.com",
      department: "Development",
      role: "Developer",
    },
    {
      id: 2,
      name: "Ananya Sharma",
      email: "ananya@example.com",
      department: "Marketing",
      role: "Manager",
    },
    {
      id: 3,
      name: "Riya Singh",
      email: "riya@example.com",
      department: "Design",
      role: "UI/UX Designer",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  // Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add / Update employee
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.department ||
      !formData.role
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (editingId) {
      setEmployees(
        employees.map((employee) =>
          employee.id === editingId
            ? {
                ...employee,
                ...formData,
              }
            : employee
        )
      );

      setEditingId(null);
    } else {
      const newEmployee = {
        id: Date.now(),
        ...formData,
      };

      setEmployees([...employees, newEmployee]);
    }

    setFormData({
      name: "",
      email: "",
      department: "",
      role: "",
    });
  };

  // Edit employee
  const handleEdit = (employee) => {
    setFormData({
      name: employee.name,
      email: employee.email,
      department: employee.department,
      role: employee.role,
    });

    setEditingId(employee.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete employee
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (confirmDelete) {
      setEmployees(
        employees.filter((employee) => employee.id !== id)
      );
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);

    setFormData({
      name: "",
      email: "",
      department: "",
      role: "",
    });
  };

  // Search
  const filteredEmployees = employees.filter((employee) => {
    const value = search.toLowerCase();

    return (
      employee.name.toLowerCase().includes(value) ||
      employee.email.toLowerCase().includes(value) ||
      employee.department.toLowerCase().includes(value) ||
      employee.role.toLowerCase().includes(value)
    );
  });

  // Avatar initials
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="employee-page">

      {/* ================= SIDEBAR ================= */}

      <aside className="employee-sidebar">

        <div className="dashboard-logo">
          <div className="dashboard-logo-icon">
            M
          </div>

          <span>MEME AI</span>
        </div>

        <nav className="dashboard-nav">

          <p className="nav-label">
            WORKSPACE
          </p>

          <Link
            to="/dashboard"
            className="dashboard-nav-item"
          >
            <span className="nav-icon">⌂</span>
            <span>Overview</span>
          </Link>

          <Link
            to="/assistant"
            className="dashboard-nav-item"
          >
            <span className="nav-icon">✦</span>
            <span>AI Assistant</span>
          </Link>

          <Link
            to="/employees"
            className="dashboard-nav-item active"
          >
            <span className="nav-icon">♙</span>
            <span>Employees</span>
          </Link>

          <Link
            to="/tasks"
            className="dashboard-nav-item"
          >
            <span className="nav-icon">✓</span>
            <span>Tasks</span>
          </Link>

          <Link
            to="/projects"
            className="dashboard-nav-item"
          >
            <span className="nav-icon">◇</span>
            <span>Projects</span>
          </Link>

          <p className="nav-label second-label">
            INSIGHTS
          </p>

          <Link
            to="/analytics"
            className="dashboard-nav-item"
          >
            <span className="nav-icon">◒</span>
            <span>Analytics</span>
          </Link>

          <Link
            to="/activity"
            className="dashboard-nav-item"
          >
            <span className="nav-icon">◷</span>
            <span>Activity</span>
          </Link>

          <p className="nav-label second-label">
            SYSTEM
          </p>

          <Link
            to="/settings"
            className="dashboard-nav-item"
          >
            <span className="nav-icon">⚙</span>
            <span>Settings</span>
          </Link>

        </nav>

        <div className="sidebar-bottom">

          <div className="ai-mini-status">
            <span className="online-dot"></span>

            <div>
              <strong>MEME AI</strong>
              <small>Systems operational</small>
            </div>
          </div>

          <div className="sidebar-user">

            <div className="user-avatar">
              A
            </div>

            <div className="sidebar-user-info">
              <strong>Akash</strong>
              <span>Free Workspace</span>
            </div>

            <button className="user-more">
              ⋮
            </button>

          </div>

        </div>

      </aside>


      {/* ================= MAIN ================= */}

      <main className="employee-content">

        {/* Topbar */}

        <header className="employee-topbar">

          <div className="breadcrumb">
            Workspace
            <span>/</span>
            <strong>Employees</strong>
          </div>

          <div className="topbar-right">

            <button className="topbar-icon">
              ⌕
            </button>

            <button className="topbar-icon">
              ♢
            </button>

            <div className="topbar-avatar">
              A
            </div>

          </div>

        </header>


        {/* Page Header */}

        <section className="employee-hero">

          <div>
            <p className="hero-small">
              WORKSPACE
            </p>

            <h1>
              Employees
            </h1>

            <p>
              Manage your team and employee information.
            </p>
          </div>

          <div className="employee-total">

            <span>
              Total Employees
            </span>

            <strong>
              {employees.length}
            </strong>

          </div>

        </section>


        {/* ================= ADD EMPLOYEE ================= */}

        <section className="employee-form-card">

          <div className="section-heading">

            <div>
              <h2>
                {editingId
                  ? "Edit Employee"
                  : "Add Employee"}
              </h2>

              <p>
                {editingId
                  ? "Update employee information"
                  : "Add a new member to your workspace"}
              </p>
            </div>

          </div>


          <form
            className="employee-form"
            onSubmit={handleSubmit}
          >

            <div className="employee-field">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter employee name"
              />

            </div>


            <div className="employee-field">

              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="employee@example.com"
              />

            </div>


            <div className="employee-field">

              <label>
                Department
              </label>

              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="e.g. Development"
              />

            </div>


            <div className="employee-field">

              <label>
                Role
              </label>

              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. Developer"
              />

            </div>


            <div className="employee-form-buttons">

              <button
                type="submit"
                className="add-employee-btn"
              >
                {editingId
                  ? "Update Employee"
                  : "+ Add Employee"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </section>


        {/* ================= EMPLOYEE LIST ================= */}

        <section className="employee-list-card">

          <div className="employee-list-header">

            <div>
              <h2>
                Employee List
              </h2>

              <p>
                Manage your workspace members
              </p>
            </div>

            <div className="employee-count">
              {filteredEmployees.length} Members
            </div>

          </div>


          {/* Search */}

          <div className="employee-search">

            <span>
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search employees..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          {/* List */}

          <div className="employee-list">

            {filteredEmployees.length === 0 ? (

              <div className="empty-employees">
                <div>♙</div>

                <h3>
                  No employees found
                </h3>

                <p>
                  Try another search or add a new employee.
                </p>
              </div>

            ) : (

              filteredEmployees.map((employee) => (

                <div
                  className="employee-card"
                  key={employee.id}
                >

                  <div className="employee-avatar">
                    {getInitials(employee.name)}
                  </div>


                  <div className="employee-info">

                    <h3>
                      {employee.name}
                    </h3>

                    <p>
                      {employee.email}
                    </p>

                  </div>


                  <div className="employee-department">

                    <span>
                      {employee.department}
                    </span>

                  </div>


                  <div className="employee-role">

                    {employee.role}

                  </div>


                  <div className="employee-actions">

                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() =>
                        handleEdit(employee)
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(employee.id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))

            )}

          </div>

        </section>


        {/* Footer */}

        <footer className="dashboard-footer">

          <span>
            MEME AI
          </span>

          <span>
            AI-powered workspace
          </span>

        </footer>

      </main>


      {/* Background glow */}

      <div className="dashboard-glow glow-one"></div>
      <div className="dashboard-glow glow-two"></div>

    </div>
  );
}