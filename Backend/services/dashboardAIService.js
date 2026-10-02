const generateDashboardAnalysis = async (
    dashboardStatistics,
    workloadData,
    projectData,
    taskData
) => {
    try {
        const prompt = `
You are an AI Company Management Assistant.

Analyze the company management data provided below.

IMPORTANT RULES:

1. Use ONLY the provided data.
2. Do NOT invent employees, projects, tasks, numbers, deadlines, statuses, priorities, assignments, or workload information.
3. Do NOT calculate new statistics.
4. Do NOT calculate how many days remain until a deadline.
5. Do NOT assume that a task is unassigned if assignedTo contains an employee name.
6. Do NOT assume that a task has no status if a status value is provided.
7. Treat DASHBOARD STATISTICS as the source of truth for company totals.
8. Treat EMPLOYEE WORKLOAD as the source of truth for workload information.
9. Treat PROJECT DATA as the source of truth for project information.
10. Treat TASK DATA as the source of truth for task information.
11. When TASK DATA contains an assignedTo value, use that exact employee name.
12. When TASK DATA contains a status value, use that exact status.
13. When TASK DATA contains a priority value, use that exact priority.
14. When TASK DATA contains an overdue value, use that exact value.
15. Do not infer information that is not explicitly provided.
16. If information is unavailable, clearly say that it is not available.
17. Keep the analysis concise and factual.

DASHBOARD STATISTICS:

${JSON.stringify(dashboardStatistics, null, 2)}

EMPLOYEE WORKLOAD:

${JSON.stringify(workloadData, null, 2)}

PROJECT DATA:

${JSON.stringify(projectData, null, 2)}

TASK DATA:

${JSON.stringify(taskData, null, 2)}

Return the analysis using exactly these sections:

Overall Summary:
Key Concerns:
Project Concerns:
Task Concerns:
Workload Concerns:
Recommended Actions:

Remember:
- Use only the provided data.
- Do not invent information.
- Do not calculate additional statistics.
- Do not calculate remaining days.
- Do not change task assignments, statuses, or priorities.
`;

        const response = await fetch(
            "http://localhost:11434/api/generate",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "llama3.2",
                    prompt: prompt,
                    stream: false
                })
            }
        );

        if (!response.ok) {
            const errorText = await response.text();

            console.error(
                "Ollama API error:",
                errorText
            );

            throw new Error(
                "Ollama API request failed"
            );
        }

        const data = await response.json();

        return data.response;

    } catch (error) {
        console.error(
            "Dashboard AI error:",
            error.message
        );

        throw new Error(
            "Dashboard AI analysis failed"
        );
    }
};

module.exports = {
    generateDashboardAnalysis
};