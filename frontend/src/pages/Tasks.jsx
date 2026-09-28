import { useState } from "react";
import "../styles/tasks.css";

import TaskList from "../components/tasks/TaskList";
import TaskFilter from "../components/tasks/TaskFilter";
import TaskForm from "../components/tasks/TaskForm";

export default function Tasks() {
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  return (
    <div className="tasks-page">

      {/* ================= HEADER ================= */}
      <header className="tasks-header">

        <div className="tasks-title-section">
          <div className="tasks-breadcrumb">
            Workspace <span>/</span> Tasks
          </div>

          <h1>Tasks</h1>

          <p className="tasks-subtitle">
            Manage and track your team's work.
          </p>
        </div>

        <button
          className="create-task-btn"
          onClick={() => setShowForm(true)}
        >
          <span className="plus-icon">+</span>
          Create Task
        </button>

      </header>


      {/* ================= SEARCH + FILTER ================= */}
      <section className="tasks-controls">

        <div className="search-wrapper">

          <span className="search-icon">⌕</span>

          <input
            type="text"
            className="task-search"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <TaskFilter
          filter={filter}
          setFilter={setFilter}
        />

      </section>


      {/* ================= TASK LIST ================= */}
      <section className="tasks-card">

        <TaskList
          search={search}
          filter={filter}
        />

      </section>


      {/* ================= CREATE TASK MODAL ================= */}
      {showForm && (
        <TaskForm
          onClose={() => setShowForm(false)}
        />
      )}

    </div>
  );
}