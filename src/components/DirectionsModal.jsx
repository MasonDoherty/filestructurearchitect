import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "80%",
    width: "80%",
    overflow: "auto",
  },
};

Modal.setAppElement("#root");

const DirectionsModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Directions"
    >
      <h2>How to Use FileArchitect</h2>
      <p>
        FileArchitect is a powerful tool to help you create and manage file
        structures easily.
      </p>
      <ol>
        <li>Click on "New Structure" to start a new file structure.</li>
        <li>Use the buttons to add root folders, files, and nested folders.</li>
        <li>Drag and drop items to rearrange them as needed.</li>
        <li>
          Double-click on an item to rename it. Hit Enter or click the green
          checkmark to save changes.
        </li>
        <li>
          Set file extensions using the provided buttons or enter a custom
          extension.
        </li>
        <li>
          Click "Generate Script" to create the structure script, which you can
          download and run to generate the files and folders on your system.
        </li>
        <li>Use the "Reset" button to start over.</li>
      </ol>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default DirectionsModal;
