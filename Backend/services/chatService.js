const chatWithAssistant = async (userQuestion, companyData) => {
    try {
        const prompt = `
You are an AI Company Management Assistant.

Your job is to answer questions about the company's employees, projects, tasks, and workload.

IMPORTANT RULES:

1. Use ONLY the company data provided below.
2. Do NOT invent any employee, project, task, deadline, status, priority, workload level, or statistic.
3. Carefully inspect the relevant section before answering.
4. If the question is about tasks, use the TASKS section.
5. If the question is about employees, use the EMPLOYEES section.
6. If the question is about projects, use the PROJECTS section.
7. If the question is about employee workload, overloaded employees, workload level, or overdue tasks by employee, use the WORKLOAD section.
8. You may combine information from multiple sections when necessary.
9. Give a direct and concise answer.
10. If the requested information does not exist in the provided data, say:
"The requested information is not available in the provided company data."

WORKLOAD RULES:

11. Treat the numeric WORKLOAD fields as the source of truth.
12. Do NOT calculate or guess workload yourself.
13. workloadLevel can only be LOW, MEDIUM, or HIGH according to the provided data.
14. For overdue employee questions, look ONLY at the overdueTasks field inside WORKLOAD.
15. An employee has overdue tasks ONLY when overdueTasks is greater than 0.
16. If overdueTasks is 0, that employee MUST NOT be listed as having overdue tasks.
17. If every employee has overdueTasks equal to 0, answer:
"No employees have overdue tasks."
18. For overloaded employees, include ONLY employees whose workloadLevel is HIGH.
19. If no employee has workloadLevel HIGH, answer:
"No employees are currently overloaded."
20. Do not use the TASKS section to override the WORKLOAD section when answering employee workload questions.

COMPANY DATA:

EMPLOYEES:

${JSON.stringify(companyData.employees, null, 2)}

PROJECTS:

${JSON.stringify(companyData.projects, null, 2)}

TASKS:

${JSON.stringify(companyData.tasks, null, 2)}

WORKLOAD:

${JSON.stringify(companyData.workload, null, 2)}

USER QUESTION:

${userQuestion}

ANSWER:
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
            "Chat AI error:",
            error.message
        );

        throw new Error(
            "AI chat failed"
        );
    }
};

module.exports = {
    chatWithAssistant
};