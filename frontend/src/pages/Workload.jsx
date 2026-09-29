import { useState } from "react";
import "../styles/Workload.css";

function Workload() {
  const [loading, setLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState("");

  // Temporary frontend data
  const employees = [
    {
      employee: "Rahul",
      totalTasks: 7,
      activeTasks: 5,
      highPriorityTasks: 3,
      overdueTasks: 2,
      blockedTasks: 1,
      workloadLevel: "HIGH",
    },
    {
      employee: "Anjali",
      totalTasks: 4,
      activeTasks: 3,
      highPriorityTasks: 1,
      overdueTasks: 0,
      blockedTasks: 0,
      workloadLevel: "MEDIUM",
    },
    {
      employee: "Arun",
      totalTasks: 2,
      activeTasks: 2,
      highPriorityTasks: 0,
      overdueTasks: 0,
      blockedTasks: 0,
      workloadLevel: "LOW",
    },
  ];

  const handleAIAnalysis = () => {
    setLoading(true);
    setAiAnalysis("");

    setTimeout(() => {
      setAiAnalysis(
        "Rahul has a high workload with several active and high-priority tasks. Some tasks are overdue and should be reviewed. Employee workload should be monitored."
      );

      setLoading(false);
    }, 1500);
  };

  return (
    <div className="workload-page">

      {/* HEADER */}
      <div className="workload-header">
        <div>
          <p className="workload-label">AI WORKSPACE</p>

          <h1>📊 Employee Workload Analysis</h1>

          <p>
            Monitor employee tasks, priorities and workload levels.
          </p>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="workload-summary">

        <div className="summary-card">
          <span>Total Employees</span>
          <strong>{employees.length}</strong>
        </div>

        <div className="summary-card">
          <span>Total Tasks</span>
          <strong>
            {employees.reduce(
              (total, employee) => total + employee.totalTasks,
              0
            )}
          </strong>
        </div>

        <div className="summary-card">
          <span>Overdue Tasks</span>
          <strong className="danger-number">
            {employees.reduce(
              (total, employee) => total + employee.overdueTasks,
              0
            )}
          </strong>
        </div>

        <div className="summary-card">
          <span>High Priority</span>
          <strong className="warning-number">
            {employees.reduce(
              (total, employee) =>
                total + employee.highPriorityTasks,
              0
            )}
          </strong>
        </div>

      </div>

      {/* TABLE */}
      <div className="workload-table-container">

        <div className="table-header">
          <div>
            <h2>Employee Workload</h2>
            <p>
              Current task distribution across employees
            </p>
          </div>
        </div>

        <div className="table-wrapper">

          <table className="workload-table">

            <thead>
              <tr>
                <th>Employee</th>
                <th>Total Tasks</th>
                <th>Active Tasks</th>
                <th>High Priority</th>
                <th>Overdue</th>
                <th>Blocked</th>
                <th>Workload</th>
              </tr>
            </thead>

            <tbody>

              {employees.map((employee, index) => (

                <tr key={index}>

                  <td>
                    <div className="employee-name">
                      <div className="employee-avatar">
                        {employee.employee.charAt(0)}
                      </div>

                      <strong>
                        {employee.employee}
                      </strong>
                    </div>
                  </td>

                  <td>
                    {employee.totalTasks}
                  </td>

                  <td>
                    {employee.activeTasks}
                  </td>

                  <td>
                    <span
                      className={
                        employee.highPriorityTasks > 0
                          ? "number-warning"
                          : "number-normal"
                      }
                    >
                      {employee.highPriorityTasks}
                    </span>
                  </td>

                  <td>
                    <span
                      className={
                        employee.overdueTasks > 0
                          ? "number-danger"
                          : "number-normal"
                      }
                    >
                      {employee.overdueTasks}
                    </span>
                  </td>

                  <td>
                    {employee.blockedTasks}
                  </td>

                  <td>
                    <span
                      className={`workload-badge ${employee.workloadLevel.toLowerCase()}`}
                    >
                      {employee.workloadLevel}
                    </span>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* AI ANALYSIS */}
      <div className="ai-workload-section">

        <div className="ai-section-content">

          <div className="ai-section-icon">
            🤖
          </div>

          <div>
            <h2>AI Workload Analysis</h2>

            <p>
              Let AI analyze employee workload, priorities,
              overdue tasks and workload distribution.
            </p>
          </div>

        </div>

        <button
          className="analyze-workload-button"
          onClick={handleAIAnalysis}
          disabled={loading}
        >
          {loading
            ? "Analyzing..."
            : "🤖 Analyze Workload with AI"}
        </button>

      </div>

      {/* LOADING */}
      {loading && (
        <div className="loading-text">
          <span className="loading-dot"></span>
          AI is analyzing employee workload...
        </div>
      )}

      {/* RESULT */}
      {aiAnalysis && !loading && (
        <div className="ai-workload-result">

          <div className="result-header">
            <div className="result-icon">
              🤖
            </div>

            <div>
              <h2>AI Workload Analysis</h2>
              <p>Analysis based on current workload data</p>
            </div>
          </div>

          <div className="result-content">
            <p>{aiAnalysis}</p>
          </div>

          <div className="recommendation-box">
            <strong>Recommendation</strong>

            <p>
              Review high-priority and overdue tasks and
              consider redistributing work where necessary.
            </p>
          </div>

        </div>
      )}

    </div>
  );
}

export default Workload;