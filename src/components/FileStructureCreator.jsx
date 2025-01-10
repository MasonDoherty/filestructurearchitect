import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ScriptModal from "./ScriptModal";
import DirectionsModal from "./DirectionsModal";
import AboutModal from "./AboutModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Ads from './Ads'; // Import the Ads component
import { faFolderPlus, faFileCirclePlus, faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const FileStructureCreator = () => {
  const [structure, setStructure] = useState([]);
  const [expandedItems, setExpandedItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingItemName, setEditingItemName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDirectionsModalOpen, setIsDirectionsModalOpen] = useState(true); // Open on beginning
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [scriptContent, setScriptContent] = useState("");



  useEffect(() => {
    const savedStructure = JSON.parse(localStorage.getItem("fileStructure"));
    if (savedStructure) {
      setStructure(savedStructure);
      setExpandedItems(getAllIds(savedStructure));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("fileStructure", JSON.stringify(structure));
  }, [structure]);

  const getAllIds = (items) => {
    let ids = [];
    items.forEach((item) => {
      ids.push(item?.id);
      if (item?.children) {
        ids = ids.concat(getAllIds(item.children));
      }
    });
    return ids;
  };

  const removeItem = (items, id) => {
    return items
      .filter((item) => item.id !== id)
      .map((item) => {
        if (item.children) {
          item.children = removeItem(item.children, id);
        }
        return item;
      });
  };

  const addItem = (type, parentId = null) => {
    let baseName = `New ${type}`;
    let name = baseName;
    if (type === "File") {
      name = name.replace(/\s+/g, "_");
    }

    const newItem = {
      id: `${type}-${Date.now()}`,
      type,
      name,
      children: type === "Folder" ? [] : null,
    };

    const generateUniqueName = (items, name, count = 1) => {
      const existingNames = items.map((item) => item.name);
      let uniqueName = name;
      while (existingNames.includes(uniqueName)) {
        uniqueName = `${name}(${count})`;
        count++;
      }
      return uniqueName;
    };

    if (parentId === null) {
      newItem.name = generateUniqueName(structure, name);
      const newStructure = [...structure, newItem];
      setStructure(newStructure);
      setExpandedItems(getAllIds(newStructure));
    } else {
      const newStructure = [...structure];
      addChildToParent(newStructure, parentId, newItem);
      newItem.name = generateUniqueName(
        findParent(newStructure, parentId).children,
        name
      );
      setStructure(newStructure);
      setExpandedItems(getAllIds(newStructure));
    }
  };

const addChildToParent = (items, parentId, child) => {
  if (!Array.isArray(items)) return;

  for (const item of items) {
    if (!item) continue; // Skip null items
    if (item.id === parentId) {
      if (!item.children) {
        item.children = [];
      }
      item.children.push(child);
      return;
    }
    if (item.children) {
      addChildToParent(item.children, parentId, child);
    }
  }
};


  const findParent = (items, parentId) => {
    for (let item of items) {
      if (item.id === parentId) {
        return item;
      }
      if (item.children) {
        const found = findParent(item.children, parentId);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  const handleNameChange = (id, name) => {
    if (name.trim() === "") return;

    const item = findItemById(structure, id);
    if (!item) return;

    if (item.type === "File") {
      name = name.replace(/\s+/g, "_");
      if (!name.includes(".")) {
        alert("File must have an extension.");
        return;
      }
    }

    const newStructure = [...structure];
    updateItemName(newStructure, id, name);
    setStructure(newStructure);
  };

  const findItemById = (items, id) => {
    for (let item of items) {
      if (item.id === id) {
        return item;
      }
      if (item.children) {
        const found = findItemById(item.children, id);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  const updateItemName = (items, id, name) => {
    for (let item of items) {
      if (item.id === id) {
        item.name = name;
        return;
      }
      if (item.children) {
        updateItemName(item.children, id, name);
      }
    }
  };

  const handleGenerate = () => {
    const scriptContent = generateScript(structure);
    setScriptContent(scriptContent);
    setIsModalOpen(true);
  };

  const handleDownload = () => {
    const blob = new Blob([scriptContent], { type: "text/javascript" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "createStructure.js";
    a.click();
  };

    const protectedFiles = new Set([
    "package.json",
    "README.md",
    ".gitignore",
    ".env",
    "LICENSE",
    ".babelrc",
    "tsconfig.json",
    "webpack.config.js",
    ".eslintrc",
    ".prettierrc",
    "Dockerfile",
    ".dockerignore",
    ".nvmrc",
    "yarn.lock",
  ]);
//where the gcript to be downloaded is from: 
const generateScript = (structure) => {
  const directories = new Set();
  const files = {};

  const traverseStructure = (items, path = "") => {
    items.forEach((item) => {
      const itemPath = path ? `${path}/${item.name}` : item.name;

      if (item.type === "Folder") {
        directories.add(itemPath);
        traverseStructure(item.children, itemPath);
      } else if (!protectedFiles.has(item.name)) {
        // Generate React component structure for non-protected files
        const componentName = item.name.replace(/[^a-zA-Z0-9]/g, "_"); // Ensure valid variable name
        const content = `
/* ${item.name} */

import React from 'react';

const ${componentName} = () => {
  return (
    <div>
      {/* Your component content goes here */}
      <h1>${item.name} Component</h1>
    </div>
  );
};

export default ${componentName};
        `;
        files[itemPath] = content;
      } else {
        // For protected files, just include the file name as a comment
        const content = `
/* ${item.name} */
        `;
        files[itemPath] = content;
      }
    });
  };

  traverseStructure(structure);

  const dirCommands = Array.from(directories).map(
    (dir) =>
      `if (!fs.existsSync('${dir}')) {\n  fs.mkdirSync('${dir}', { recursive: true });\n}`
  );
  const fileCommands = Object.entries(files).map(
    ([file, content]) => `fs.writeFileSync('${file}', \`${content}\`);`
  );

  return `
const fs = require('fs');

${dirCommands.join("\n")}

${fileCommands.join("\n")}

console.log('Project structure created successfully.');
  `;
};

  const toggleExpand = (id) => {
    if (expandedItems.includes(id)) {
      setExpandedItems(expandedItems.filter((itemId) => itemId !== id));
    } else {
      setExpandedItems([...expandedItems, id]);
    }
  };

  const loadPredefinedStructure = (structure) => {
    setStructure(structure);
    setExpandedItems(getAllIds(structure));
  };

  const handleDoubleClick = (id, name) => {
    setEditingItemId(id);
    setEditingItemName(name);
  };

  const handleEditChange = (e) => {
    setEditingItemName(e.target.value);
  };

  const handleEditBlur = (id) => {
    handleNameChange(id, editingItemName);
    setEditingItemId(null);
    setEditingItemName("");
  };

  const handleKeyPress = (e, id) => {
    if (e.key === "Enter") {
      handleEditBlur(id);
    }
  };

  const setFileExtension = (extension) => {
    const updateFileNames = (items) => {
      return items.map((item) => {
        if (item.type === "File" && !protectedFiles.has(item.name)) {
          const extIndex = item.name.lastIndexOf(".");
          if (extIndex !== -1) {
            item.name = item.name.substring(0, extIndex) + extension;
          } else {
            item.name = item.name + extension;
          }
        }
        if (item.children) {
          item.children = updateFileNames(item.children);
        }
        return item;
      });
    };

    setStructure(updateFileNames(structure));
  };

  const handleCustomExtension = () => {
    let extension = prompt("Enter custom file extension (e.g., .py or py):");
    if (extension) {
      if (!extension.startsWith(".")) {
        extension = `.${extension}`;
      }
      setFileExtension(extension);
    }
  };

  const resetStructure = () => {
    setStructure([]);
    setExpandedItems([]);
  };

  const moveItemInStructure = (items, id, direction) => {
    const index = items.findIndex((item) => item.id === id);
    if (index !== -1) {
      const newItems = [...items];
      const [movedItem] = newItems.splice(index, 1);
      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (newIndex >= 0 && newIndex < newItems.length) {
        newItems.splice(newIndex, 0, movedItem);
      } else if (newIndex < 0) {
        newItems.unshift(movedItem);
      } else {
        newItems.push(movedItem);
      }
      return newItems;
    }
    return items.map((item) => {
      if (item.children) {
        const newChildren = moveItemInStructure(item.children, id, direction);
        return { ...item, children: newChildren };
      }
      return item;
    });
  };

  const renderStructure = (items) => {
    return (
      <ul className="file-structure">
        {items.map((item, index) => (
          <li
            key={item.id}
            className={`file-item ${
              item.type === "Folder" ? "folder" : "file"
            }`}
          >
            <div className="file-item-content">
              <div className="file-item-icons">
                {index > 0 && (
                  <i
                    className="fas fa-caret-up"
                    onClick={() =>
                      setStructure((prevStructure) =>
                        moveItemInStructure(prevStructure, item.id, "up")
                      )
                    }
                    style={{ cursor: "pointer" }}
                  ></i>
                )}
                {index < items.length - 1 && (
                  <i
                    className="fas fa-caret-down"
                    onClick={() =>
                      setStructure((prevStructure) =>
                        moveItemInStructure(prevStructure, item.id, "down")
                      )
                    }
                    style={{ cursor: "pointer" }}
                  ></i>
                )}
              </div>
              {item.type === "Folder" ? (
                <i className="fas fa-folder" style={{ marginRight: "5px" }}></i>
              ) : (
                <i className="fas fa-file" style={{ marginRight: "5px" }}></i>
              )}
              {editingItemId === item.id ? (
                <span>
                  <input
                    type="text"
                    value={editingItemName}
                    onChange={handleEditChange}
                    onBlur={() => handleEditBlur(item.id)}
                    onKeyPress={(e) => handleKeyPress(e, item.id)}
                    autoFocus
                  />
                  <i
                    className="fas fa-check-circle"
                    onClick={() => handleEditBlur(item.id)}
                    style={{
                      marginLeft: "5px",
                      color: "green",
                      cursor: "pointer",
                    }}
                  ></i>
                </span>
              ) : (
                <span
                  onDoubleClick={() => handleDoubleClick(item.id, item.name)}
                >
                  {item.name}
                </span>
              )}
            {item.type === "Folder" && (
              <>
                <FontAwesomeIcon
                  icon={faFolderPlus}
                  onClick={() => addItem("Folder", item.id)}
                  style={{ marginLeft: '5px', cursor: 'pointer' }}
                />
                <FontAwesomeIcon
                  icon={faFileCirclePlus}
                  onClick={() => addItem("File", item.id)}
                  style={{ marginLeft: '5px', cursor: 'pointer' }}
                />
                <FontAwesomeIcon
                  icon={expandedItems.includes(item.id) ? faMinusCircle : faPlusCircle}
                  onClick={() => toggleExpand(item.id)}
                  style={{ marginLeft: '5px', cursor: 'pointer' }}
                />
                {expandedItems.includes(item.id) && renderStructure(item.children)}
              </>
            )}

            </div>
            <i
              className="fas fa-trash"
              onClick={() => setStructure(removeItem(structure, item.id))}
              style={{ marginLeft: "auto", cursor: "pointer", color: "red" }}
            ></i>
          </li>
        ))}
      </ul>
    );
  };


return (
  <div className="app" style={{ display: "flex" }}>
    <Sidebar loadStructure={loadPredefinedStructure} />
    <div className="main" style={{ flex: 1 }}>
      <>
        <button onClick={() => addItem("Folder")}>Add Root Folder</button>
        <button onClick={() => addItem("File")}>Add Root File</button>
        <div style={{ marginBottom: "1rem" }}>
          <button onClick={() => setFileExtension(".js")}>Set .js</button>
          <button onClick={() => setFileExtension(".jsx")}>Set .jsx</button>
          <button onClick={() => setFileExtension(".ts")}>Set .ts</button>
          <button onClick={() => setFileExtension(".tsx")}>Set .tsx</button>
          <button onClick={handleCustomExtension}>
            Set Custom Extension
          </button>
        </div>
        <div>
          {renderStructure(structure)}
        </div>
        <button onClick={handleGenerate}>Generate Script</button>
        <button onClick={resetStructure} style={{ marginLeft: "1rem" }}>
          Reset
        </button>
        <button onClick={() => setIsDirectionsModalOpen(true)}>
          How to Use
        </button>
        <button
          onClick={() => setIsAboutModalOpen(true)}
          style={{ marginLeft: "1rem" }}
        >
          About
        </button>
      </>
      <ScriptModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        scriptContent={scriptContent}
        handleDownload={handleDownload}
      />
      <DirectionsModal
        isOpen={isDirectionsModalOpen}
        onRequestClose={() => setIsDirectionsModalOpen(false)}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        onRequestClose={() => setIsAboutModalOpen(false)}
      />
    </div>
    <div
      className="ads-container"
      style={{
        width: "300px",
        borderLeft: "1px solid #ccc",
        padding: "1rem",
        boxSizing: "border-box",
      }}
    >
      <Ads />
    </div>
  </div>
);

};

export default FileStructureCreator;
