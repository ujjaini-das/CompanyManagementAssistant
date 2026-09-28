import { useState } from "react";
import "../styles/projects.css";

function Projects() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");

  const [projects, setProjects] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!projectName.trim()) {
      alert("Please enter a project name");
      return;
    }

    const newProject = {
      id: Date.now(),
      name: projectName,
      description: description,
      status: status,
    };

    setProjects((prevProjects) => [...prevProjects, newProject]);

    setProjectName("");
    setDescription("");
    setStatus("Active");
  };

  const handleDelete = (id) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== id)
    );
  };

  return (
    <div className="projects-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="projects-header">
        <div>
          <div className="projects-eyebrow">
            WORKSPACE
          </div>

          <h1>Projects</h1>

          <p>
            Manage and track your team's projects
          </p>
        </div>
      </div>


      {/* =====================================================
          ADD PROJECT CARD
      ===================================================== */}

      <form
        className="project-form"
        onSubmit={handleSubmit}
      >

        <div className="form-top">

          <div>
            <span className="form-label-small">
              PROJECT MANAGEMENT
            </span>

            <h2>Add New Project</h2>

            <p className="form-description">
              Create a project and keep your team's work organized.
            </p>
          </div>

          <div className="form-icon">
            +
          </div>

        </div>


        {/* PROJECT NAME */}

        <div className="project-form-group">

          <label htmlFor="projectName">
            Project Name
          </label>

          <input
            id="projectName"
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter project name"
          />

        </div>


        {/* DESCRIPTION */}

        <div className="project-form-group">

          <label htmlFor="description">
            Description
          </label>

          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter project description"
          />

        </div>


        {/* STATUS */}

        <div className="project-form-group">

          <label htmlFor="status">
            Status
          </label>

          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Active">
              Active
            </option>

            <option value="Planning">
              Planning
            </option>

            <option value="On Hold">
              On Hold
            </option>

            <option value="Completed">
              Completed
            </option>
          </select>

        </div>


        {/* BUTTON */}

        <div className="form-footer">

          <button
            type="submit"
            className="add-project-btn"
          >
            <span>+</span>
            Add Project
          </button>

        </div>

      </form>


      {/* =====================================================
          PROJECTS SECTION
      ===================================================== */}

      <section className="projects-list">

        <div className="projects-section-header">

          <div>
            <span className="section-eyebrow">
              WORKSPACE
            </span>

            <h2>Your Projects</h2>
          </div>

          <div className="project-count">
            {projects.length}{" "}
            {projects.length === 1 ? "Project" : "Projects"}
          </div>

        </div>


        {/* ===================================================
            NO PROJECTS
        =================================================== */}

        {projects.length === 0 ? (

          <div className="no-projects">

            <div className="empty-icon">
              ✦
            </div>

            <h3>
              No Projects Yet
            </h3>

            <p>
              Create your first project to get started.
            </p>

          </div>

        ) : (

          /* =================================================
             PROJECT GRID
          ================================================= */

          <div className="projects-grid">

            {projects.map((project) => (

              <div
                className="project-card"
                key={project.id}
              >

                {/* CARD TOP */}

                <div className="project-card-top">

                  <div className="project-card-icon">
                    ✦
                  </div>

                  <span
                    className={`project-status ${project.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    <span className="status-dot"></span>

                    {project.status}
                  </span>

                </div>


                {/* CARD CONTENT */}

                <div className="project-card-content">

                  <h3>
                    {project.name}
                  </h3>

                  <p>
                    {project.description ||
                      "No description added for this project."}
                  </p>

                </div>


                {/* CARD FOOTER */}

                <div className="project-card-footer">

                  <span className="project-created">
                    Project
                  </span>

                  <button
                    type="button"
                    className="delete-project"
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}

export default Projects;