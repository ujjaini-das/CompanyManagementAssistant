import { useState } from "react";
import { Link } from "react-router-dom";

import EmployeeForm from "../components/EmployeeForm";

import "../styles/employees.css";

export default function Employees() {
  /* =====================================================
     EMPLOYEE DATA
  ===================================================== */

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Rahul Kumar",
      email: "rahul@example.com",
      department: "Development",
      role: "Developer",
      status: "Active",
    },
    {
      id: 2,
      name: "Ananya Sharma",
      email: "ananya@example.com",
      department: "Marketing",
      role: "Manager",
      status: "Active",
    },
    {
      id: 3,
      name: "Riya Singh",
      email: "riya@example.com",
      department: "Design",
      role: "UI/UX Designer",
      status: "Inactive",
    },
  ]);

  /* =====================================================
     STATE
  ===================================================== */

  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [search, setSearch] = useState("");

  /* =====================================================
     ADD / UPDATE EMPLOYEE
  ===================================================== */

  function handleSaveEmployee(employeeData) {
    if (editingEmployee) {
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.id === editingEmployee.id
            ? {
                ...employee,
                ...employeeData,
              }
            : employee
        )
      );

      setEditingEmployee(null);
      setShowForm(false);

      return;
    }

    const newEmployee = {
      id: Date.now(),
      ...employeeData,
      status: employeeData.status || "Active",
    };

    setEmployees((prevEmployees) => [
      ...prevEmployees,
      newEmployee,
    ]);

    setShowForm(false);
  }

  /* =====================================================
     EDIT
  ===================================================== */

  function handleEdit(employee) {
    setEditingEmployee(employee);
    setShowForm(true);
  }

  /* =====================================================
     DELETE
  ===================================================== */

  function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) {
      return;
    }

    setEmployees((prevEmployees) =>
      prevEmployees.filter(
        (employee) => employee.id !== id
      )
    );
  }

  /* =====================================================
     CLOSE FORM
  ===================================================== */

  function handleCloseForm() {
    setShowForm(false);
    setEditingEmployee(null);
  }

  /* =====================================================
     SEARCH
  ===================================================== */

  const filteredEmployees = employees.filter((employee) => {
    const value = search.toLowerCase().trim();

    return (
      employee.name.toLowerCase().includes(value) ||
      employee.email.toLowerCase().includes(value) ||
      employee.department.toLowerCase().includes(value) ||
      employee.role.toLowerCase().includes(value)
    );
  });

  /* =====================================================
     UI
  ===================================================== */

  return (
    <div className="employee-page">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside className="employee-sidebar">

        {/* LOGO */}

        <div className="dashboard-logo">

          <div className="dashboard-logo-icon">
            M
          </div>

          <span>MEME AI</span>

        </div>


        {/* NAVIGATION */}

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


        {/* SIDEBAR BOTTOM */}

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

            <button
              type="button"
              className="user-more"
            >
              ⋮
            </button>

          </div>

        </div>

      </aside>


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main className="employee-content">

        {/* TOP BAR */}

        <header className="employee-topbar">

          <div className="breadcrumb">
            <span>Workspace</span>
            <span>/</span>
            <strong>Employees</strong>
          </div>


          <div className="topbar-right">

            <button
              type="button"
              className="topbar-icon"
            >
              ⌕
            </button>

            <button
              type="button"
              className="topbar-icon"
            >
              ♢
            </button>

            <div className="topbar-avatar">
              A
            </div>

          </div>

        </header>


        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <section className="employees-header">

          <div>

            <div className="employees-breadcrumb">
              Workspace
              <span>/</span>
              Employees
            </div>


            <h1>
              Employees
            </h1>


            <p className="employees-subtitle">
              Manage your team and employee information.
            </p>


            <div className="employee-count">
              Total Employees
              <strong>{employees.length}</strong>
            </div>

          </div>


          <button
            type="button"
            className="add-employee-btn"
            onClick={() => {
              setEditingEmployee(null);
              setShowForm(true);
            }}
          >
            <span>+</span>
            Add Employee
          </button>

        </section>


        {/* =================================================
            EMPLOYEE LIST CONTAINER
        ================================================= */}

        <section className="employee-container">

          {/* HEADER */}

          <div className="employee-container-header">

            <div className="employee-container-title">

              <h2>
                Employee List
              </h2>

              <p>
                Manage your workspace members
              </p>

            </div>


            <div className="members-badge">

              {filteredEmployees.length}

              {" "}

              {filteredEmployees.length === 1
                ? "Member"
                : "Members"}

            </div>

          </div>


          {/* SEARCH */}

          <div className="employee-search-wrapper">

            <span className="employee-search-icon">
              ⌕
            </span>

            <input
              type="text"
              className="employee-search"
              placeholder="Search employees..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

          </div>


          {/* EMPLOYEE LIST */}

          <div className="employee-list">

            {filteredEmployees.length === 0 ? (

              <div className="employee-empty">

                <div className="employee-empty-icon">
                  ♙
                </div>

                <h3>
                  No employees found
                </h3>

                <p>
                  Try another search or add a new employee.
                </p>

              </div>

            ) : (

              filteredEmployees.map((employee) => (

                <article
                  className="employee-card"
                  key={employee.id}
                >

                  {/* PROFILE */}

                  <div className="employee-profile">

                    <div className="employee-avatar">
                      {employee.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="employee-profile-text">

                      <h3 className="employee-name">
                        {employee.name}
                      </h3>

                      <p className="employee-email">
                        {employee.email}
                      </p>

                    </div>

                  </div>


                  {/* DEPARTMENT */}

                  <div className="employee-info">

                    <span className="employee-info-label">
                      Department
                    </span>

                    <span className="employee-info-value">
                      {employee.department}
                    </span>

                  </div>


                  {/* ROLE */}

                  <div className="employee-info">

                    <span className="employee-info-label">
                      Role
                    </span>

                    <span className="employee-role">
                      {employee.role}
                    </span>

                  </div>


                  {/* STATUS */}

                  <div className="employee-info">

                    <span className="employee-info-label">
                      Status
                    </span>

                    <span
                      className={`employee-status ${
                        employee.status.toLowerCase()
                      }`}
                    >

                      <span className="employee-status-dot"></span>

                      {employee.status}

                    </span>

                  </div>


                  {/* ACTIONS */}

                  <div className="employee-actions">

                    <button
                      type="button"
                      className="employee-edit-btn"
                      onClick={() =>
                        handleEdit(employee)
                      }
                    >
                      Edit
                    </button>


                    <button
                      type="button"
                      className="employee-delete-btn"
                      onClick={() =>
                        handleDelete(employee.id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </article>

              ))

            )}

          </div>

        </section>


        {/* FOOTER */}

        <footer className="dashboard-footer">

          <span>
            MEME AI
          </span>

          <span>
            AI-powered workspace
          </span>

        </footer>

      </main>


      {/* =================================================
          ADD / EDIT MODAL
      ================================================= */}

      {showForm && (

        <div
          className="employee-modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              handleCloseForm();
            }
          }}
        >

          <EmployeeForm
            onAddEmployee={handleSaveEmployee}
            onClose={handleCloseForm}
            employee={editingEmployee}
          />

        </div>

      )}

    </div>
  );
}