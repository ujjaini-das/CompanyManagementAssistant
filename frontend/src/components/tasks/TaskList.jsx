const tasks = [
  {
    id: 1,
    title: "Login UI",
    description: "Create login interface",
    project: "Project A",
    priority: "HIGH",
    status: "COMPLETED",
  },
  {
    id: 2,
    title: "API Setup",
    description: "Create authentication API",
    project: "Project A",
    priority: "HIGH",
    status: "IN PROGRESS",
  },
  {
    id: 3,
    title: "Testing",
    description: "Test application",
    project: "Project B",
    priority: "MEDIUM",
    status: "TODO",
  },
  {
    id: 4,
    title: "Database Setup",
    description: "Configure MongoDB database",
    project: "Project B",
    priority: "MEDIUM",
    status: "TODO",
  },
  {
    id: 5,
    title: "Dashboard UI",
    description: "Design dashboard interface",
    project: "Project C",
    priority: "LOW",
    status: "BLOCKED",
  },
];


export default function TaskList({ search, filter }) {

  const filteredTasks = tasks.filter((task) => {

    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      task.description
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      task.project
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "ALL" ||
      task.status === filter;

    return matchesSearch && matchesFilter;
  });


  return (
    <div className="task-list">

      {/* ================= TABLE HEADER ================= */}

      <div className="task-table-header">

        <div>Task</div>

        <div>Project</div>

        <div>Priority</div>

        <div>Status</div>

      </div>


      {/* ================= TASK ROWS ================= */}

      {filteredTasks.length > 0 ? (

        filteredTasks.map((task) => (

          <div
            className="task-row"
            key={task.id}
          >

            {/* TASK */}

            <div className="task-info">

              <div className="task-icon">
                ✦
              </div>

              <div className="task-text">

                <h3>
                  {task.title}
                </h3>

                <p>
                  {task.description}
                </p>

              </div>

            </div>


            {/* PROJECT */}

            <div className="task-project">
              {task.project}
            </div>


            {/* PRIORITY */}

            <div>

              <span
                className={`priority ${task.priority.toLowerCase()}`}
              >
                {task.priority}
              </span>

            </div>


            {/* STATUS */}

            <div>

              <span
                className={`task-status ${task.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >

                <span className="status-dot"></span>

                {task.status}

              </span>

            </div>

          </div>

        ))

      ) : (

        <div className="no-tasks">
          <div className="no-task-icon">
            ✦
          </div>

          <h3>No tasks found</h3>

          <p>
            Try changing your search or filter.
          </p>
        </div>

      )}

    </div>
  );
}