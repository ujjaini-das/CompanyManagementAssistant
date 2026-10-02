const generateAlertAnalysis = async (alerts) => {
    try {
        const prompt = `
You are an AI Company Management Assistant.

You must analyze the alerts provided below.

ALERT DATA:

${JSON.stringify(alerts, null, 2)}

STRICT RULES:

1. The ALERT DATA is the only source of truth.
2. Never invent information.
3. Never ignore an alert that exists in ALERT DATA.
4. Every alert must appear in at least one of the four sections.
5. A TASK_OVERDUE alert MUST appear under "Immediate Attention".
6. A TASK_BLOCKED alert MUST appear under "Immediate Attention".
7. A DEADLINE_APPROACHING alert MUST appear under "Upcoming Risks".
8. A WORKLOAD_ALERT alert MUST appear under "Workload Concerns" if that section is available.
9. A HIGH_PRIORITY alert MUST appear under "Important Alerts".
10. An URGENT alert must be treated as urgent.
11. A HIGH alert must remain HIGH. Never call HIGH "URGENT".
12. Preserve the exact task name, project name, priority, status, deadline, and assigned employee from the alert.
13. Do not calculate new statistics.
14. Do not create alerts that are not present.
15. If a section has no applicable alert, write:
"None identified from the provided alerts."
16. Do not say "None identified" in a section if an applicable alert exists.
17. Recommended Actions must be based only on the provided alerts.
18. Do not recommend completing something by a deadline that has already passed.

IMPORTANT PRIORITY ORDER:

1. URGENT overdue tasks
2. HIGH overdue tasks
3. BLOCKED tasks
4. Approaching deadlines
5. HIGH workload concerns
6. HIGH priority tasks

Return EXACTLY these sections:

Important Alerts:

Immediate Attention:

Upcoming Risks:

Recommended Actions:

Now analyze the provided ALERT DATA.
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
            "Alert AI error:",
            error.message
        );

        throw new Error(
            "AI alert analysis failed"
        );
    }
};

module.exports = {
    generateAlertAnalysis
};