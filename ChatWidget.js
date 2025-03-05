import React, { useState } from "react";
import "./ChatWidget.css"; // Import styles for chat widget
import { getLLMResponse } from "./llmService"; // Import predefined function

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const prompt = `Hi , this is karthick and karthick is a Software Engineer \n\nQuestion : ${input}`;
      const responseText = await getLLMResponse(prompt); // Using predefined function
      const botMessage = { sender: "bot", text: responseText };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching LLM response:", error);
    }
  };

  return (
    <div className="chat-widget">
      {!isOpen && <button className="chat-toggle" onClick={toggleChat}>💬</button>}
      {isOpen && (
        <div className="chat-box">
          <div className="chat-header">
            <span>Chat Support</span>
            <button onClick={toggleChat}>✖</button>
          </div>
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={msg.sender === "user" ? "user-msg" : "bot-msg"}>{msg.text}</div>
            ))}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
