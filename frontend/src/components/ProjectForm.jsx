import { useState } from "react";

function ProjectForm({ onAdd }) {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter project name");
      return;
    }

    const newProject = {
      id: Date.now(),
      name: name,
      description: description,
      status: status,
      members: 0
    };

    onAdd(newProject);

    setName("");
    setDescription("");
    setStatus("Active");
  };

  return (
    <form>

      <h2>Add New Project</h2>

      <label>Project Name</label>

      <input
        type="text"
        placeholder="Enter project name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Description</label>

      <textarea
        placeholder="Enter project description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label>Status</label>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>

      <button
        type="button"
        onClick={handleSubmit}
      >
        + Add Project
      </button>

    </form>
  );
}

export default ProjectForm;