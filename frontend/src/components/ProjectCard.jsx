function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <div className="project-card">

      <div className="project-card-header">
        <div>
          <h3>{project.name}</h3>

          <p>
            {project.description || "No description available"}
          </p>
        </div>

        <span className="project-status">
          {project.status || "Active"}
        </span>
      </div>

      <div className="project-meta">

        <span>
          👥 {project.members || 0} Members
        </span>

        {project.deadline && (
          <span>
            📅 {project.deadline}
          </span>
        )}

      </div>

      <div className="project-actions">

        <button
          onClick={() => onEdit(project)}
        >
          Edit
        </button>

        <button
          className="delete"
          onClick={() => onDelete(project.id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default ProjectCard;