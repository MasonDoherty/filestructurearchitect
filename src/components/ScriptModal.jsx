import React, { useState } from "react";
import Modal from "react-modal";
import PopupNotification from "./PopupNotification";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const ScriptModal = ({
  isOpen,
  onRequestClose,
  scriptContent,
  handleDownload,
}) => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleCopyText = () => {
    navigator.clipboard.writeText(scriptContent).then(() => {
      setPopupVisible(true); // Show popup
    }).catch((err) => {
      console.error("Failed to copy text: ", err);
    });
  };

  const closePopup = () => setPopupVisible(false);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        contentLabel="Generated Script"
      >
        <h2>Generated Script</h2>
        <pre
          style={{
            backgroundColor: "#f4f4f4",
            padding: "1rem",
            borderRadius: "5px",
            whiteSpace: "pre-wrap",
            overflowY: "auto",
            maxHeight: "300px", // Set max height for the scrollable area
          }}
        >
          {scriptContent}
        </pre>
        <div style={{ marginBottom: "1rem" }}>
          <button onClick={handleCopyText}>Copy Text</button>
          <button onClick={handleDownload} style={{ marginLeft: "1rem" }}>
            Download Script
          </button>
          <button onClick={onRequestClose} style={{ marginLeft: "1rem" }}>
            Close
          </button>
        </div>
        <h3>Instructions</h3>
        <p>1. Download the script using the button above.</p>
        <p>
          2. Place the downloaded script in the root folder where you want to
          create the structure.
        </p>
        <p>3. Open a terminal and navigate to the root folder.</p>
        <p>4. Run the script using the following command:</p>
        <pre
          style={{
            backgroundColor: "#f4f4f4",
            padding: "1rem",
            borderRadius: "5px",
            whiteSpace: "pre-wrap",
            overflowY: "auto",
            maxHeight: "150px", // Adjust as needed
          }}
        >
          node createStructure.js
        </pre>
      </Modal>
      <PopupNotification
        message="Script content copied to clipboard!"
        isVisible={isPopupVisible}
        onClose={closePopup}
      />
    </>
  );
};

export default ScriptModal;
