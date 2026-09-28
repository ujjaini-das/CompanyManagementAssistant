function AIAnalysisCard({ analysis }) {
  if (!analysis) return null;

  return (
    <>
      <style>{`
        .meme-ai-card {
          width: 100% !important;
          max-width: 1100px !important;
          margin-top: 35px !important;
          padding: 30px !important;
          box-sizing: border-box !important;

          background: rgba(30, 61, 72, 0.92) !important;
          color: #ffffff !important;

          border: 1px solid rgba(255, 255, 255, 0.18) !important;
          border-radius: 24px !important;

          box-shadow:
            0 20px 50px rgba(0, 0, 0, 0.20),
            inset 0 1px 0 rgba(255, 255, 255, 0.12) !important;

          backdrop-filter: blur(20px) !important;
          -webkit-backdrop-filter: blur(20px) !important;
        }

        .meme-ai-header {
          display: flex !important;
          justify-content: space-between !important;
          align-items: center !important;
          padding-bottom: 22px !important;
          border-bottom: 1px solid rgba(255,255,255,0.14) !important;
        }

        .meme-ai-label {
          display: block !important;
          margin-bottom: 7px !important;
          color: #bcefff !important;
          font-size: 11px !important;
          font-weight: 800 !important;
          letter-spacing: 3px !important;
        }

        .meme-ai-title {
          margin: 0 !important;
          color: #ffffff !important;
          font-size: 26px !important;
          font-weight: 700 !important;
        }

        .meme-ai-risk {
          padding: 9px 18px !important;
          border-radius: 50px !important;

          background: rgba(255, 92, 92, 0.18) !important;
          border: 1px solid rgba(255, 150, 150, 0.35) !important;

          color: #ffcccc !important;
          font-size: 12px !important;
          font-weight: 800 !important;
          letter-spacing: 2px !important;
        }

        .meme-ai-section {
          margin-top: 24px !important;
        }

        .meme-ai-section-title {
          margin: 0 0 12px 0 !important;
          color: #ffffff !important;
          font-size: 16px !important;
          font-weight: 700 !important;
        }

        .meme-ai-item {
          display: block !important;
          width: 100% !important;
          box-sizing: border-box !important;

          margin-bottom: 9px !important;
          padding: 12px 15px !important;

          background: rgba(255,255,255,0.07) !important;
          border: 1px solid rgba(255,255,255,0.10) !important;
          border-radius: 12px !important;

          color: #eaf8fc !important;
          font-size: 14px !important;
          line-height: 1.5 !important;
        }

        .meme-ai-item:hover {
          background: rgba(255,255,255,0.12) !important;
        }

        @media (max-width: 700px) {
          .meme-ai-card {
            padding: 20px !important;
          }

          .meme-ai-header {
            align-items: flex-start !important;
            gap: 15px !important;
          }

          .meme-ai-title {
            font-size: 21px !important;
          }
        }
      `}</style>

      <div className="meme-ai-card">

        <div className="meme-ai-header">
          <div>
            <span className="meme-ai-label">
              AI INSIGHT
            </span>

            <h2 className="meme-ai-title">
              Project Analysis
            </h2>
          </div>

          <div className="meme-ai-risk">
            {analysis.riskLevel}
          </div>
        </div>

        <div className="meme-ai-section">
          <h3 className="meme-ai-section-title">
            ⚠ Risks
          </h3>

          {analysis.risks.map((risk, index) => (
            <div
              className="meme-ai-item"
              key={index}
            >
              {risk}
            </div>
          ))}
        </div>

        <div className="meme-ai-section">
          <h3 className="meme-ai-section-title">
            ⏰ Overdue Tasks
          </h3>

          {analysis.overdueTasks.map((task, index) => (
            <div
              className="meme-ai-item"
              key={index}
            >
              {task}
            </div>
          ))}
        </div>

        <div className="meme-ai-section">
          <h3 className="meme-ai-section-title">
            🔒 Blocked Tasks
          </h3>

          {analysis.blockedTasks.map((task, index) => (
            <div
              className="meme-ai-item"
              key={index}
            >
              {task}
            </div>
          ))}
        </div>

        <div className="meme-ai-section">
          <h3 className="meme-ai-section-title">
            ✓ Recommendations
          </h3>

          {analysis.recommendations.map((recommendation, index) => (
            <div
              className="meme-ai-item"
              key={index}
            >
              {recommendation}
            </div>
          ))}
        </div>

      </div>
    </>
  );
}

export default AIAnalysisCard;