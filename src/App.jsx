import React from "react";
import Chatbot from "./components/Chatbot";
import VideoPopup from "./components/videoPopup";
import "./styles/App.css";

const App = () => {
  return (
    <div className="app-container">
      <h1>Museum Ticketing Chatbot</h1>
      <Chatbot />
      <VideoPopup />
    </div>
  );
};

export default App;
