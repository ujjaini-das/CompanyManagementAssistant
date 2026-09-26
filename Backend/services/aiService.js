const analyzeProject = async (projectData) => {
    try {
        const prompt = `
You are an AI company management assistant.

Analyze the following project and its tasks.

Project:
${JSON.stringify(projectData.project, null, 2)}

Tasks:
${JSON.stringify(projectData.tasks, null, 2)}

Identify:

1. Overdue tasks
2. High-priority risks
3. Blocked or delayed tasks
4. Possible project delays
5. Employees who may require attention based on assigned workload
6. Recommended actions

Important rules:
- Do not invent information.
- Use only the information provided.
- If there are no blocked tasks, clearly say that no blocked tasks were identified from the supplied data.
- If there is not enough information for something, say so.
- Keep the analysis clear and concise.

Return the result using exactly these sections:

Summary:
Risks:
Overdue Tasks:
Workload Concerns:
Recommendations:
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

        return {
            analysis: data.response
        };

    } catch (error) {
        console.error("AI analysis error:", error.message);
        throw new Error("AI analysis failed");
    }
};

module.exports = {
    analyzeProject
};