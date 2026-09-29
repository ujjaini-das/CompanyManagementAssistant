import "../styles/dashboard.css";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="meme-dashboard">

      {/* ================= SIDEBAR ================= */}
      <aside className="dashboard-sidebar">

        <div className="dashboard-logo">
          <div className="dashboard-logo-icon">M</div>
          <span>MEME AI</span>
        </div>

        <nav className="dashboard-nav">

          <p className="nav-label">WORKSPACE</p>

          {/* Overview */}
          <Link
            to="/dashboard"
            className="dashboard-nav-item active"
          >
            <span className="nav-icon">⌂</span>
            <span>Overview</span>
          </Link>

          {/* AI Assistant */}
          <Link
            to="/ai-assistant"
            className="dashboard-nav-item"
          >
            <span className="nav-icon">✦</span>
            <span>AI Assistant</span>
          </Link>

          {/* Employees */}
          <Link
            to="/employees"
            className="dashboard-nav-item"
          >
            <span className="nav-icon">♙</span>
            <span>Employees</span>
          </Link>

          {/* Tasks */}
          <Link
            to="/tasks"
            className="dashboard-nav-item"
          >
            <span className="nav-icon">✓</span>
            <span>Tasks</span>
          </Link>

          {/* Projects */}
          <Link
            to="/projects"
            className="dashboard-nav-item"
          >
            <span className="nav-icon">◇</span>
            <span>Projects</span>
          </Link>

          {/* AI Analysis */}
          <Link
            to="/ai-analysis"
            className="dashboard-nav-item"
          >
            <span className="nav-icon">✦</span>
            <span>AI Analysis</span>
          </Link>

          {/* Workload - ADDED */}
          <Link
            to="/workload"
            className="dashboard-nav-item"
          >
            <span className="nav-icon">◒</span>
            <span>Workload</span>
          </Link>

          {/* ================= INSIGHTS ================= */}
          <p className="nav-label second-label">
            INSIGHTS
          </p>

          {/* Analytics */}
          <Link
            to="/analytics"
            className="dashboard-nav-item"
          >
            <span className="nav-icon">◒</span>
            <span>Analytics</span>
          </Link>

          {/* Activity */}
          <Link
            to="/activity"
            className="dashboard-nav-item"
          >
            <span className="nav-icon">◷</span>
            <span>Activity</span>
          </Link>

          {/* ================= SYSTEM ================= */}
          <p className="nav-label second-label">
            SYSTEM
          </p>

          {/* Settings */}
          <Link
            to="/settings"
            className="dashboard-nav-item"
          >
            <span className="nav-icon">⚙</span>
            <span>Settings</span>
          </Link>

        </nav>

        {/* ================= SIDEBAR BOTTOM ================= */}
        <div className="sidebar-bottom">

          <div className="ai-mini-status">
            <span className="online-dot"></span>

            <div>
              <strong>MEME AI</strong>
              <small>Systems operational</small>
            </div>
          </div>

          <div className="sidebar-user">

            <div className="user-avatar">
              A
            </div>

            <div className="sidebar-user-info">
              <strong>Akash</strong>
              <span>Free Workspace</span>
            </div>

            <button className="user-more">
              ⋮
            </button>

          </div>

        </div>

      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="dashboard-content">

        {/* ================= TOPBAR ================= */}
        <header className="dashboard-topbar">

          <div className="mobile-logo">
            <div className="dashboard-logo-icon">
              M
            </div>

            <span>MEME AI</span>
          </div>

          <div className="topbar-left">

            <div className="breadcrumb">
              Workspace
              <span>/</span>
              <strong>Overview</strong>
            </div>

          </div>

          <div className="topbar-right">

            <button className="topbar-icon">
              ⌕
            </button>

            <button className="topbar-icon notification">
              ♢
              <span></span>
            </button>

            <div className="topbar-avatar">
              A
            </div>

          </div>

        </header>

        {/* ================= HERO ================= */}
        <section className="dashboard-hero">

          <div>

            <p className="hero-small">
              MONDAY, SEPTEMBER 21
            </p>

            <h1>
              Good morning, Akash.
            </h1>

            <p className="hero-description">
              Your AI workspace is ready. What would you like to accomplish
              today?
            </p>

          </div>

          {/* Ask AI */}
          <Link
            to="/ai-assistant"
            className="ask-ai-button"
          >
            <span>✦</span>
            Ask MEME AI
            <span>→</span>
          </Link>

        </section>

        {/* ================= STATS ================= */}
        <section className="stats-container">

          <div className="stat-card">

            <div className="stat-card-top">
              <span>AI Tasks</span>
              <div className="stat-icon blue">✦</div>
            </div>

            <h2>1,284</h2>

            <div className="stat-bottom">
              <span className="positive">
                ↑ 18.2%
              </span>

              <span>
                vs last month
              </span>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-card-top">
              <span>Completed</span>
              <div className="stat-icon green">✓</div>
            </div>

            <h2>924</h2>

            <div className="stat-bottom">
              <span className="positive">
                ↑ 12.4%
              </span>

              <span>
                completion rate
              </span>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-card-top">
              <span>AI Usage</span>
              <div className="stat-icon purple">◉</div>
            </div>

            <h2>76%</h2>

            <div className="usage-line">
              <div style={{ width: "76%" }}></div>
            </div>

            <div className="stat-bottom">
              <span>7.6k / 10k</span>
              <span>credits</span>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-card-top">
              <span>Time Saved</span>
              <div className="stat-icon orange">◷</div>
            </div>

            <h2>42h</h2>

            <div className="stat-bottom">
              <span className="positive">
                ↑ 21.3%
              </span>

              <span>
                this month
              </span>
            </div>

          </div>

        </section>

        {/* ================= DASHBOARD GRID ================= */}
        <section className="dashboard-grid">

          {/* Recent Activity */}
          <div className="dashboard-panel activity-panel">

            <div className="panel-header">

              <div>
                <h3>Recent AI Activity</h3>
                <p>Your latest automated actions</p>
              </div>

              <button>
                View all →
              </button>

            </div>

            <div className="activity-list">

              <div className="activity-row">

                <div className="activity-symbol blue-symbol">
                  ✦
                </div>

                <div className="activity-info">
                  <strong>
                    Monthly report generated
                  </strong>

                  <span>
                    MEME AI created your September performance report
                  </span>
                </div>

                <time>2m</time>

              </div>

              <div className="activity-row">

                <div className="activity-symbol green-symbol">
                  ✓
                </div>

                <div className="activity-info">
                  <strong>
                    Task automation completed
                  </strong>

                  <span>
                    14 tasks were processed automatically
                  </span>
                </div>

                <time>18m</time>

              </div>

              <div className="activity-row">

                <div className="activity-symbol purple-symbol">
                  ◇
                </div>

                <div className="activity-info">
                  <strong>
                    Data analysis completed
                  </strong>

                  <span>
                    AI analyzed 248 records
                  </span>
                </div>

                <time>1h</time>

              </div>

              <div className="activity-row">

                <div className="activity-symbol orange-symbol">
                  ◎
                </div>

                <div className="activity-info">
                  <strong>
                    New workflow created
                  </strong>

                  <span>
                    Marketing automation workflow is now active
                  </span>
                </div>

                <time>3h</time>

              </div>

            </div>

          </div>

          {/* AI PANEL */}
          <div className="dashboard-panel ai-panel">

            <div className="panel-header">

              <div>
                <h3>MEME AI</h3>
                <p>Assistant status</p>
              </div>

              <div className="live-badge">
                <span></span>
                LIVE
              </div>

            </div>

            <div className="ai-orb">

              <div className="orb-ring ring-a"></div>
              <div className="orb-ring ring-b"></div>

              <div className="orb-core">
                ✦
              </div>

            </div>

            <div className="ai-online-text">

              <h3>
                AI is ready
              </h3>

              <p>
                Your assistant is online and waiting for your next command.
              </p>

            </div>

            <Link
              to="/ai-assistant"
              className="open-ai-button"
            >
              Open AI Assistant
              <span>→</span>
            </Link>

          </div>

        </section>

        {/* ================= BOTTOM GRID ================= */}
        <section className="bottom-grid">

          {/* Quick Actions */}
          <div className="dashboard-panel">

            <div className="panel-header">

              <div>
                <h3>Quick Actions</h3>
                <p>Get things done faster</p>
              </div>

            </div>

            <div className="quick-actions">

              {/* Ask AI */}
              <Link to="/ai-assistant">

                <span className="quick-icon">✦</span>

                <div>
                  <strong>Ask AI</strong>
                  <small>Start a conversation</small>
                </div>

              </Link>

              {/* Create Task */}
              <Link to="/tasks">

                <span className="quick-icon">+</span>

                <div>
                  <strong>Create Task</strong>
                  <small>Add a new task</small>
                </div>

              </Link>

              {/* New Project */}
              <Link to="/projects">

                <span className="quick-icon">◇</span>

                <div>
                  <strong>New Project</strong>
                  <small>Start something new</small>
                </div>

              </Link>

              {/* Generate Report */}
              <Link to="/analytics">

                <span className="quick-icon">▤</span>

                <div>
                  <strong>Generate Report</strong>
                  <small>Analyze your data</small>
                </div>

              </Link>

              {/* Workload - ADDED */}
              <Link to="/workload">

                <span className="quick-icon">◒</span>

                <div>
                  <strong>Employee Workload</strong>
                  <small>Analyze employee workload</small>
                </div>

              </Link>

            </div>

          </div>

          {/* Productivity */}
          <div className="dashboard-panel productivity-panel">

            <div className="panel-header">

              <div>
                <h3>Productivity</h3>
                <p>This week's performance</p>
              </div>

              <span className="productivity-percent">
                84%
              </span>

            </div>

            <div className="big-progress">

              <div
                className="big-progress-fill"
                style={{ width: "84%" }}
              ></div>

            </div>

            <div className="productivity-stats">

              <div>
                <strong>38</strong>
                <span>Tasks done</span>
              </div>

              <div>
                <strong>12h</strong>
                <span>Time saved</span>
              </div>

              <div>
                <strong>91%</strong>
                <span>Efficiency</span>
              </div>

            </div>

          </div>

        </section>

        {/* ================= FOOTER ================= */}
        <footer className="dashboard-footer">
          <span>MEME AI</span>
          <span>AI-powered workspace</span>
        </footer>

      </main>

      {/* ================= BACKGROUND GLOW ================= */}
      <div className="dashboard-glow glow-one"></div>
      <div className="dashboard-glow glow-two"></div>

    </div>
  );
}