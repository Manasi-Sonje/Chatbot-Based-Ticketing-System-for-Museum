import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "system" },
  ]);
  const [input, setInput] = useState("");

  // Track booking details
  const [step, setStep] = useState(null); // Track conversation stage
  const [selectedMuseum, setSelectedMuseum] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTickets, setSelectedTickets] = useState("");

  const responses = {
    hello: "Hello! Which museum do you want to book?",
    hi: "Hi there! Looking to book a museum ticket?",
    "book ticket": "Sure! Which museum are you interested in?",
    "museum info":
      "We have various museums available. Which one would you like details about?",
    default: "I'm not sure about that. Can you rephrase your question?",
  };

  const getResponse = (userMessage) => {
    const lowerCaseMsg = userMessage.toLowerCase();

    if (step === "ask_museum") {
      setSelectedMuseum(userMessage);
      setStep("ask_date");
      return `Great! You chose ${userMessage}. On which date would you like to visit?`;
    }

    if (step === "ask_date") {
      setSelectedDate(userMessage);
      setStep("ask_tickets");
      return `Got it! You want to visit on ${userMessage}. How many tickets do you need?`;
    }

    if (step === "ask_tickets") {
      setSelectedTickets(userMessage);
      setStep(null);
      return `Booking confirmed! 🎉 You have booked ${userMessage} ticket(s) for ${selectedMuseum} on ${selectedDate}.`;
    }

    if (lowerCaseMsg.includes("book ticket")) {
      setStep("ask_museum");
      return "Sure! Which museum are you interested in?";
    }

    return responses[lowerCaseMsg] || responses.default;
  };

  const handleSendMessage = () => {
    if (input.trim() !== "") {
      const userMessage = { text: input, sender: "user" };
      const botResponse = { text: getResponse(input), sender: "system" };

      setMessages([...messages, userMessage, botResponse]);
      setInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
  
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }
  
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
  
    recognition.start();
  
    recognition.onstart = () => {
      console.log("Voice recognition started. Speak now...");
    };
  
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      alert("Microphone error or not allowed. Please check permissions.");
    };
  
    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      setInput(voiceText);
    };
  
    recognition.onend = () => {
      console.log("Voice recognition ended.");
    };
  };
  

  return (
    <div className="chatbot">
      <div className="chatbox">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}-message`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
        <button onClick={handleVoiceInput}>🎤</button>
      </div>
    </div>
  );
};

export default Chatbot;
