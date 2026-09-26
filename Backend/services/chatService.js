const chatWithAssistant = async (userQuestion, companyData) => {
    try {
        const prompt = `
You are an AI Company Management Assistant.

Your job is to answer questions about the company's employees, projects, and tasks.

IMPORTANT RULES:

1. Use ONLY the company data provided below.
2. Do not invent any employee, project, task, deadline, status, priority, or statistic.
3. Carefully inspect ALL employees, projects, and tasks before answering.
4. If the question is about tasks, use the TASKS section.
5. If the question is about employees, use the EMPLOYEES section.
6. If the question is about projects, use the PROJECTS section.
7. You may combine information from multiple sections when necessary.
8. If the requested information does not exist in the provided data, say:
"The requested information is not available in the provided company data."
9. Give a direct answer. Do not explain these rules.

COMPANY DATA:

${JSON.stringify(companyData, null, 2)}

USER QUESTION:

${userQuestion}

ANSWER:
`;

        const response = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama3.2",
                prompt: prompt,
                stream: false
            })
        });

        if (!response.ok) {
            const errorText = await response.text();

            console.error("Ollama API error:", errorText);

            throw new Error("Ollama API request failed");
        }

        const data = await response.json();

        return data.response;

    } catch (error) {
        console.error("Chat AI error:", error.message);
        throw new Error("AI chat failed");
    }
};

module.exports = {
    chatWithAssistant
};