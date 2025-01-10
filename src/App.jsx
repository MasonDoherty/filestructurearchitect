import React from "react";
import Navbar from "./components/NavBar";
import FileStructureCreator from "./components/FileStructureCreator";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <FileStructureCreator />
    </div>
  );
}

export default App;
