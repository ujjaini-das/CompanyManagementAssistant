import { useState } from "react";

function EmployeeForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log({
      name,
      email,
      department,
      role,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Employee</h2>

      <div>
        <label>Name</label>
        <br />
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter name"
        />
      </div>

      <br />

      <div>
        <label>Email</label>
        <br />
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter email"
        />
      </div>

      <br />

      <div>
        <label>Department</label>
        <br />
        <input
          type="text"
          value={department}
          onChange={(event) => setDepartment(event.target.value)}
          placeholder="Enter department"
        />
      </div>

      <br />

      <div>
        <label>Role</label>
        <br />
        <input
          type="text"
          value={role}
          onChange={(event) => setRole(event.target.value)}
          placeholder="Enter role"
        />
      </div>

      <br />

      <button type="submit">Add Employee</button>
    </form>
  );
}

export default EmployeeForm;