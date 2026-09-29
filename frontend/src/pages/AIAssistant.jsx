import { useState } from "react";
import ChatMessage from "../components/ChatMessage";
import "../styles/AIAssistant.css";

function AIAssistant() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "AI",
      message:
        "Hello! I am your AI Company Assistant. Ask me about employees, projects, or tasks."
    }
  ]);

  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (message.trim() === "") {
      return;
    }

    const userMessage = {
      sender: "User",
      message: message
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage
    ]);

    setMessage("");
    setLoading(true);

    // Temporary AI response
    setTimeout(() => {
      const aiMessage = {
        sender: "AI",
        message: getTemporaryAIResponse(userMessage.message)
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        aiMessage
      ]);

      setLoading(false);
    }, 1000);
  };

  const getTemporaryAIResponse = (question) => {
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes("overdue")) {
      return "There are currently some overdue tasks. The real AI analysis will provide the exact tasks from the database.";
    }

    if (lowerQuestion.includes("employee")) {
      return "The real AI assistant will analyze employee information from the company database.";
    }

    if (lowerQuestion.includes("project")) {
      return "The real AI assistant will analyze your projects and their current status.";
    }

    if (lowerQuestion.includes("task")) {
      return "The real AI assistant will analyze task priority, status, deadlines and assignments.";
    }

    return "I understand your question. Once the backend is connected, I will analyze the actual company data and provide an answer.";
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="ai-page">

      <div className="ai-header">
        <h1>🤖 AI Company Assistant</h1>

        <p>
          Ask questions about your employees, projects and tasks.
        </p>
      </div>

      <div className="chat-container">

        <div className="chat-messages">

          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              sender={msg.sender}
              message={msg.message}
            />
          ))}

          {loading && (
            <div className="ai-thinking">
              🤖 AI is thinking...
            </div>
          )}

        </div>

        <div className="chat-input-area">

          <input
            type="text"
            placeholder="Ask something about your company..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button
            onClick={handleSend}
            disabled={loading}
          >
            {loading ? "Thinking..." : "Send"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default AIAssistant;