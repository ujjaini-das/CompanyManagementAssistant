import { useEffect, useState } from "react";

export default function EmployeeForm({
  onAddEmployee,
  onClose,
  employee,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
    status: "Active",
  });

  /* =====================================================
     LOAD EMPLOYEE WHEN EDITING
  ===================================================== */

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || "",
        email: employee.email || "",
        department: employee.department || "",
        role: employee.role || "",
        status: employee.status || "Active",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        department: "",
        role: "",
        status: "Active",
      });
    }
  }, [employee]);


  /* =====================================================
     INPUT CHANGE
  ===================================================== */

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }


  /* =====================================================
     SUBMIT
  ===================================================== */

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.department.trim() ||
      !formData.role.trim()
    ) {
      return;
    }

    onAddEmployee({
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
      department: formData.department.trim(),
      role: formData.role.trim(),
    });
  }


  return (
    <div
      className="employee-modal"
      onMouseDown={(event) => {
        event.stopPropagation();
      }}
    >

      {/* =================================================
          MODAL HEADER
      ================================================= */}

      <div className="employee-modal-header">

        <div>

          <span className="modal-label">
            TEAM MANAGEMENT
          </span>

          <h2>
            {employee
              ? "Edit Employee"
              : "Add Employee"}
          </h2>

          <p className="modal-description">
            {employee
              ? "Update employee information."
              : "Add a new member to your workspace."}
          </p>

        </div>


        <button
          type="button"
          className="close-btn"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

      </div>


      {/* =================================================
          FORM
      ================================================= */}

      <form onSubmit={handleSubmit}>

        {/* NAME */}

        <div className="form-group">

          <label htmlFor="employee-name">
            Name
          </label>

          <input
            id="employee-name"
            type="text"
            name="name"
            placeholder="Enter employee name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
            required
          />

        </div>


        {/* EMAIL */}

        <div className="form-group">

          <label htmlFor="employee-email">
            Email
          </label>

          <input
            id="employee-email"
            type="email"
            name="email"
            placeholder="Enter employee email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />

        </div>


        {/* DEPARTMENT */}

        <div className="form-group">

          <label htmlFor="employee-department">
            Department
          </label>

          <input
            id="employee-department"
            type="text"
            name="department"
            placeholder="e.g. Development"
            value={formData.department}
            onChange={handleChange}
            required
          />

        </div>


        {/* ROLE */}

        <div className="form-group">

          <label htmlFor="employee-role">
            Role
          </label>

          <input
            id="employee-role"
            type="text"
            name="role"
            placeholder="e.g. Developer"
            value={formData.role}
            onChange={handleChange}
            required
          />

        </div>


        {/* STATUS */}

        <div className="form-group">

          <label htmlFor="employee-status">
            Status
          </label>

          <select
            id="employee-status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >

            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>

          </select>

        </div>


        {/* BUTTONS */}

        <div className="form-actions">

          <button
            type="button"
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>


          <button
            type="submit"
            className="save-btn"
          >
            {employee
              ? "Save Changes"
              : "Add Employee"}
          </button>

        </div>

      </form>

    </div>
  );
}