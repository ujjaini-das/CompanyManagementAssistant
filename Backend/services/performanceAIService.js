const generatePerformanceAnalysis = async (
    performanceData
) => {
    try {
        const prompt = `
You are an AI Company Management Assistant.

Analyze the employee performance statistics provided below.

IMPORTANT RULES:

1. Use ONLY the provided performance data.
2. Do NOT invent employees, tasks, numbers, workload levels, or performance statistics.
3. Do NOT calculate new statistics.
4. Treat every numeric field as factual data.
5. Treat completionRate as the exact completion rate calculated by the backend.
6. Treat workload as the exact workload level calculated by the backend.
7. Treat assignedTasks as the exact number of assigned tasks.
8. Treat completedTasks as the exact number of completed tasks.
9. Treat pendingTasks as the exact number of TODO tasks.
10. Treat inProgressTasks as the exact number of IN_PROGRESS tasks.
11. Treat blockedTasks as the exact number of BLOCKED tasks.
12. Treat overdueTasks as the exact number of overdue tasks.
13. Treat highPriorityTasks as the exact number of HIGH or URGENT tasks.
14. Do not change, ignore, or reinterpret any provided value.
15. If blockedTasks is greater than 0, the employee MUST be considered as needing attention.
16. If overdueTasks is greater than 0, the employee MUST be considered as needing attention.
17. If completionRate is 0 and assignedTasks is greater than 0, the employee MUST be considered as needing attention.
18. ONLY employees whose workload field is exactly "HIGH" may appear under Overloaded Employees.
19. If workload is "MEDIUM", the employee MUST NOT be called overloaded.
20. If workload is "LOW", the employee MUST NOT be called overloaded.
21. highPriorityTasks does NOT mean the employee is overloaded.
22. blockedTasks does NOT mean the employee is overloaded.
23. overdueTasks does NOT mean the employee is overloaded.
24. completionRate does NOT determine the workload level.
25. Never place an employee under Overloaded Employees unless workload is exactly "HIGH".
26. If highPriorityTasks is greater than 0, mention the high-priority tasks when relevant, but do NOT classify the employee as overloaded unless workload is exactly "HIGH".
27. Do not say that an employee has no blocked tasks when blockedTasks is greater than 0.
28. Do not say that an employee has no outstanding tasks when assignedTasks is greater than completedTasks.
29. Do not claim that there are no concerns if the provided data contains blocked tasks, overdue tasks, incomplete tasks, or high-priority tasks.
30. If all employees have blockedTasks = 0, say that no blocked-task concerns were identified.
31. If all employees have overdueTasks = 0, say that no overdue-task concerns were identified.
32. If all employees have workload = LOW, say that no overloaded employees were identified.
33. Keep the analysis concise and factual.
34. Do NOT calculate averages, totals, percentages, or derived statistics.
35. Do NOT report average completion rate, average workload, average assigned tasks, average completed tasks, or any other average.
36. Do NOT calculate outstanding tasks as assignedTasks minus completedTasks.
37. Employees Needing Attention MUST include a specific reason based only on the provided fields.
38. If completionRate is 0 and assignedTasks is greater than 0, mention "completion rate is 0%".
39. If blockedTasks is greater than 0, mention the exact blockedTasks value.
40. If overdueTasks is greater than 0, mention the exact overdueTasks value.
41. If highPriorityTasks is greater than 0, mention the exact highPriorityTasks value when relevant.
42. If an employee has multiple concerns, mention all relevant concerns.
43. The workload field MUST be copied exactly from the provided data.
44. If an employee has workload = LOW, you MUST write workload = LOW.
45. If an employee has workload = MEDIUM, you MUST write workload = MEDIUM.
46. If an employee has workload = HIGH, you MUST write workload = HIGH.
47. NEVER change LOW to MEDIUM or HIGH.
48. NEVER change MEDIUM to LOW or HIGH.
49. NEVER change HIGH to LOW or MEDIUM.
50. Before writing Overloaded Employees, check the workload field of every employee directly from the provided data.
51. If no employee has workload exactly equal to HIGH, write "None" under Overloaded Employees.
52. Do not infer workload from assignedTasks, completedTasks, blockedTasks, overdueTasks, highPriorityTasks, or completionRate.
53. Never describe a completionRate of 0% as a "high completion rate". Call it "completion rate of 0%".
54. Workload = LOW is not a concern by itself.
55. Workload = MEDIUM is not a concern by itself.
56. Do not recommend reviewing, correcting, or addressing a LOW workload unless another provided field indicates a specific concern.
57. Do not list LOW workload under Workload Concerns.
58. Do not repeat the same employee multiple times in Employees Needing Attention or Recommended Actions unless necessary.
59. Do not recommend "ensuring the workload level is accurately reported" when the workload value is already provided by the backend.

PERFORMANCE DATA:

${JSON.stringify(performanceData, null, 2)}

Return the analysis using exactly these sections:

Summary:
Strong Performers:
Employees Needing Attention:
Overloaded Employees:
Overdue Task Concerns:
Workload Concerns:
Recommended Actions:

Remember:

- Use only the provided data.
- Do not invent information.
- Do not calculate additional statistics.
- Do not ignore blockedTasks.
- Do not ignore overdueTasks.
- Do not ignore highPriorityTasks.
- Do not claim there are no concerns when the data shows concerns.
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
            "Performance AI error:",
            error.message
        );

        throw new Error(
            "Performance AI analysis failed"
        );
    }
};

module.exports = {
    generatePerformanceAnalysis
};