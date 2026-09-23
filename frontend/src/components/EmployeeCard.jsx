function EmployeeCard({ name, department, role }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>Department: {department}</p>
      <p>Role: {role}</p>
    </div>
  );
}

export default EmployeeCard;