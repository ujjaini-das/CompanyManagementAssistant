function ChatMessage({ sender, message }) {
  const isUser = sender === "User";

  return (
    <div className={`chat-message ${isUser ? "user-message" : "ai-message"}`}>
      <div className="message-name">
        {isUser ? "You" : "🤖 AI Assistant"}
      </div>

      <div className="message-text">
        {message}
      </div>
    </div>
  );
}

export default ChatMessage;