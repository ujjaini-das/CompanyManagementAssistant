function EmployeeCard({ employee }) {
  return (
    <div className="employee-card">
      <h3>{employee.name}</h3>

      <p>
        <strong>Department:</strong> {employee.department}
      </p>

      <p>
        <strong>Role:</strong> {employee.role}
      </p>

      <p>
        <strong>Email:</strong> {employee.email}
      </p>

      <span
        className={
          employee.status === "Active"
            ? "active"
            : "inactive"
        }
      >
        ● {employee.status}
      </span>
    </div>
  );
}

export default EmployeeCard;