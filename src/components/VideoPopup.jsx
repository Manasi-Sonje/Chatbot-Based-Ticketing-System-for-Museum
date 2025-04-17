import React, { useState } from "react";

const VideoPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="video-popup-container">
      <button className="video-btn" onClick={() => setIsOpen(!isOpen)}>
        🎥
      </button>
      {isOpen && (
        <div className="video-modal">
          <iframe
            width="599"
            height="366"
            src="https://www.youtube.com/embed/FvBnMuON3Ec"
            title="Chhatrapati Shivaji Maharaj Vastu Sangrahalaya Museum 2023 | Mumbai"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default VideoPopup;
