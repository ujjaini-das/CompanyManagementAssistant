export default function TaskCard({ task }) {
  return (
    <div className="task-card">
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>

      <div className="task-project">
        {task.project}
      </div>

      <div className={`priority ${task.priority.toLowerCase()}`}>
        {task.priority}
      </div>

      <div className={`status ${task.status.toLowerCase()}`}>
        {task.status}
      </div>
    </div>
  );
}