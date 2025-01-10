import React, { useEffect } from "react";

const PopupNotification = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000); // Auto-close after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    isVisible && (
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#333",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "5px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
          zIndex: 1000,
        }}
      >
        {message}
      </div>
    )
  );
};

export default PopupNotification;
