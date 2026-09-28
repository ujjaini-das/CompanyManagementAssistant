import { useState } from "react";
import AIAnalysisCard from "../components/AIAnalysisCard";
import "../styles/aiAnalysis.css";

function AIAnalysis() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeProject = () => {
    setLoading(true);

    setTimeout(() => {
      setAnalysis({
        riskLevel: "HIGH",

        risks: [
          "2 high-priority tasks are still incomplete",
          "One task is blocked",
          "Project deadline is approaching",
        ],

        overdueTasks: [
          "Database integration",
          "Testing module",
        ],

        blockedTasks: [
          "Frontend and backend integration",
        ],

        recommendations: [
          "Complete high-priority tasks first",
          "Resolve the blocked task",
          "Review the project deadline",
        ],
      });

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="ai-analysis-page">

      <div className="ai-analysis-header">
        <span>AI INSIGHTS</span>

        <h1>AI Project Risk Analysis</h1>

        <p>
          Analyze your project and identify possible risks,
          overdue tasks, blocked tasks and recommendations.
        </p>
      </div>

      <button
        className="analyze-project-btn"
        onClick={analyzeProject}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Project"}
      </button>

      {loading && (
        <div className="analysis-loading">
          AI is analyzing the project...
        </div>
      )}

      {analysis && (
        <AIAnalysisCard analysis={analysis} />
      )}

    </div>
  );
}

export default AIAnalysis;