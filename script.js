// Existing Menu Toggle Function
function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const hamburger = document.querySelector(".hamburger-menu");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("active");
    icon.classList.toggle("open");
    hamburger.classList.toggle("open");
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const chatToggle = document.getElementById("chat-toggle");
    const chatBox = document.getElementById("chat-box");
    const closeChat = document.getElementById("close-chat");
    const sendBtn = document.getElementById("send-btn");
    const chatInput = document.getElementById("chat-input");
    const chatBody = document.getElementById("chat-body");
  
    // Check if elements exist before adding event listeners
    if (!chatToggle || !chatBox || !closeChat || !sendBtn || !chatInput || !chatBody) {
        console.error("One or more chat elements are missing from the DOM.");
        return;
    }
  
    // Toggle chat visibility
    chatToggle.addEventListener("click", function () {
        chatBox.classList.toggle("active");
    });
  
    closeChat.addEventListener("click", function () {
        chatBox.classList.remove("active");
    });
  
    // Show a fixed welcome message when chat opens
    function showWelcomeMessage() {
        if (!document.querySelector(".welcome-msg")) {
            const welcomeDiv = document.createElement("div");
            welcomeDiv.className = "bot-msg welcome-msg";
            welcomeDiv.innerHTML = "👋 Welcome! How can I assist you today?";
            chatBody.appendChild(welcomeDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }
    
    showWelcomeMessage();
  
    // Function to format chatbot responses dynamically for lists and bold text
    function formatResponse(responseText) {
        // Format bold text (**bold**)
        responseText = responseText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
        // Format bullet lists starting with a new line and *
        responseText = responseText.replace(/\n\* (.+)/g, '<li> $1</li>');
    
        // Format inline bullet lists (* item *)
        responseText = responseText.replace(/\*([^*]+)\*/g, '<li> $1</li>');
    
        // Wrap list items in a <ul> tag if there are any
        if (responseText.includes("<li>")) {
            responseText = "<ul style='padding-left: 20px;'>" + responseText + "</ul>";
        }
    
        return responseText;
    }
    
  
    // Function to show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement("div");
        typingDiv.className = "bot-msg typing-indicator";
        typingDiv.innerHTML = "Typing...";
        chatBody.appendChild(typingDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
        return typingDiv;
    }
  
    // Function to send a message to the backend
    async function sendMessage() {
        const userMessage = chatInput.value.trim();
        if (!userMessage) return;
  
        addMessage("user", userMessage);
        chatInput.value = "";
        
        const typingIndicator = showTypingIndicator();
  
        try {
            const response = await fetch("http://127.0.0.1:8000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: userMessage }),
            });
  
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
  
            const data = await response.json();
            chatBody.removeChild(typingIndicator);
            addMessage("bot", formatResponse(data.response));
        } catch (error) {
            console.error("Error:", error);
            chatBody.removeChild(typingIndicator);
            addMessage("bot", "Sorry, an error occurred.");
        }
    }
  
    // Function to add messages to the chat UI with proper formatting
    function addMessage(sender, text) {
        const msgDiv = document.createElement("div");
        msgDiv.className = sender === "user" ? "user-msg" : "bot-msg";
        msgDiv.innerHTML = text;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }
  
    // Add event listener to send button
    sendBtn.addEventListener("click", sendMessage);
  
    // Send message on Enter key press
    chatInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    const chatToggle = document.getElementById("chat-toggle");
    const chatNotify = document.getElementById("chat-notify");

    // Show the notification bubble after 3 seconds
    setTimeout(() => {
        chatNotify.classList.remove("hidden");
    }, 3000);

    // Hide notification when chat button is clicked
    chatToggle.addEventListener("click", function () {
        chatNotify.classList.add("hidden");
    });
});
