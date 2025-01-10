import React from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

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

const AboutModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="About"
    >
      <h2>About FileArchitect</h2>
      <p>
        FileArchitect is created by [Your Name]. It's designed to help
        developers quickly generate file structures for their projects.
      </p>
      <p>Connect with me:</p>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li style={{ marginBottom: "0.5rem" }}>
          <a
            href="https://github.com/masondoherty"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <FontAwesomeIcon icon={faGithub} size="2x" /> GitHub
          </a>
        </li>
        <li style={{ marginBottom: "0.5rem" }}>
          <a
            href="https://www.linkedin.com/in/mason-heath-doherty/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <FontAwesomeIcon icon={faLinkedin} size="2x" /> LinkedIn
          </a>
        </li>
        <li style={{ marginBottom: "0.5rem" }}>
          <a
            href="https://www.instagram.com/masdoh.dev"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" /> Instagram
          </a>
        </li>
      </ul>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default AboutModal;
