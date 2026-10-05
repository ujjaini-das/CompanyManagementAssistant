const generateAnalyticsAnalysis = async (analyticsData) => {
    const prompt = `
You are an AI Company Management Assistant.

Analyze ONLY the company analytics data provided below.

Identify:

1. Project risks
2. Task bottlenecks
3. Projects falling behind
4. Important deadlines
5. Recommended management actions

Rules:

1. Use ONLY the provided analytics data.
2. Do NOT invent projects, tasks, numbers, deadlines, statistics, or health levels.
3. Do NOT calculate new statistics.
4. Treat all numeric values as exact backend values.
5. Treat completionRate as the exact completion rate calculated by the backend.
6. Treat health as the exact project health classification calculated by the backend.
7. Do NOT change HEALTHY, AT_RISK, or CRITICAL.
8. Do NOT call a project HEALTHY if the provided health is not HEALTHY.
9. Do NOT call a project AT_RISK if the provided health is not AT_RISK.
10. Do NOT call a project CRITICAL if the provided health is not CRITICAL.
11. If overdueTasks is greater than 0, mention the overdue task concern.
12. If blockedTasks is greater than 0, mention the blocked task concern.
13. If completionRate is below 40%, mention that the project has low completion.
14. If completionRate is 40% to 69%, mention that the project has moderate completion.
15. If completionRate is 70% or above, mention that the project has strong completion.
16. Do not invent deadlines when no deadline information is provided.
17. Keep the analysis concise and factual.
18. For project-specific statements, use only the values belonging to that specific project.
19. Never use overview values as if they belong to an individual project.
20. If a project's blockedTasks value is 0, do NOT say that the project has blocked tasks.
21. If a project's overdueTasks value is 0, do NOT say that the project has overdue tasks.
22. If a project's completionRate is 0, report completionRate as 0% for that project.
23. If a project has health = CRITICAL, report the health as CRITICAL.
24. Do not transfer task counts from one project to another.
25. Do not infer project-specific statistics from the overall overview.
26. When identifying project risks or bottlenecks, always use the project object's own statistics.
27. Before making any statement about a project, verify the project name and its corresponding statistics directly from the projects array.
28. A project may be described as having overdue tasks ONLY when that project's own overdueTasks value is greater than 0.
29. A project may be described as having blocked tasks ONLY when that project's own blockedTasks value is greater than 0.
30. A project with overdueTasks = 0 MUST NOT be described as having overdue tasks.
31. A project with blockedTasks = 0 MUST NOT be described as having blocked tasks.
32. inProgressTasks = 0 is NOT a task bottleneck and must NOT be described as one.
33. Do not use inProgressTasks alone to identify a task bottleneck.
34. Task Bottlenecks should primarily identify projects with blockedTasks greater than 0.
35. Projects Falling Behind should identify projects with overdueTasks greater than 0, completionRate below 40%, or health exactly "CRITICAL", but only using that project's own provided values.
36. Never copy overdueTasks, blockedTasks, or any other statistic from the overview into a project.
37. Never copy a statistic from one project into another project.
38. Every project-specific number mentioned in the analysis must exactly match the corresponding project's object in the projects array.

ANALYTICS DATA:

${JSON.stringify(analyticsData, null, 2)}

Return the analysis using exactly these sections:

Summary:
Project Risks:
Task Bottlenecks:
Projects Falling Behind:
Important Deadlines:
Recommended Actions:
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
                prompt,
                stream: false
            })
        }
    );

    if (!response.ok) {
        throw new Error("Failed to generate AI analytics");
    }

    const data = await response.json();

    return data.response;
};

module.exports = {
    generateAnalyticsAnalysis
};