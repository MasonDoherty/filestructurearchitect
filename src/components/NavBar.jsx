import React from "react";
import logo from "../assets/FileArchitect-21-06-2024.png";

const Navbar = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <img src={logo} alt="FileArchitect Logo" style={{ height: "100px" }} />
    </nav>
  );
};

export default Navbar;
