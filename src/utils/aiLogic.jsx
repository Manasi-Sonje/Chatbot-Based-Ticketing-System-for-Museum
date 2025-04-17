export const getChatbotResponse = async (userInput) => {
    const responses = {
      "Louvre": "The Louvre is the world's largest museum, located in Paris.",
      "Met": "The Metropolitan Museum of Art is in New York City.",
    };
  
    return responses[userInput] || "Sorry, I don't have data on that museum.";
  };
  