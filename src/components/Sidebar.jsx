import React from "react";

const Sidebar = ({ loadStructure }) => {
  const reactStructure = [
    {
      id: "folder-src",
      type: "Folder",
      name: "src",
      children: [
        {
          id: "folder-components",
          type: "Folder",
          name: "components",
          children: [],
        },
        { id: "file-index", type: "File", name: "index.js", children: null },
        { id: "file-app", type: "File", name: "App.js", children: null },
        { id: "file-app-css", type: "File", name: "App.css", children: null },
        {
          id: "file-index-css",
          type: "File",
          name: "index.css",
          children: null,
        },
      ],
    },
    {
      id: "file-package-json",
      type: "File",
      name: "package.json",
      children: null,
    },
    { id: "file-readme", type: "File", name: "README.md", children: null },
  ];

  const angularStructure = [
    {
      id: "folder-src",
      type: "Folder",
      name: "src",
      children: [
        {
          id: "folder-app",
          type: "Folder",
          name: "app",
          children: [
            {
              id: "file-app-component",
              type: "File",
              name: "app.component.ts",
              children: null,
            },
            {
              id: "file-app-module",
              type: "File",
              name: "app.module.ts",
              children: null,
            },
          ],
        },
        { id: "file-main", type: "File", name: "main.ts", children: null },
        {
          id: "file-index-html",
          type: "File",
          name: "index.html",
          children: null,
        },
      ],
    },
    {
      id: "file-angular-json",
      type: "File",
      name: "angular.json",
      children: null,
    },
    {
      id: "file-package-json",
      type: "File",
      name: "package.json",
      children: null,
    },
    { id: "file-readme", type: "File", name: "README.md", children: null },
  ];

  const nodeStructure = [
    {
      id: "folder-src",
      type: "Folder",
      name: "src",
      children: [
        { id: "file-app", type: "File", name: "app.js", children: null },
        { id: "file-server", type: "File", name: "server.js", children: null },
      ],
    },
    {
      id: "file-package-json",
      type: "File",
      name: "package.json",
      children: null,
    },
    { id: "file-readme", type: "File", name: "README.md", children: null },
  ];

  const vueStructure = [
    {
      id: "folder-src",
      type: "Folder",
      name: "src",
      children: [
        {
          id: "folder-components",
          type: "Folder",
          name: "components",
          children: [],
        },
        { id: "file-main", type: "File", name: "main.js", children: null },
        { id: "file-app-vue", type: "File", name: "App.vue", children: null },
      ],
    },
    {
      id: "file-package-json",
      type: "File",
      name: "package.json",
      children: null,
    },
    { id: "file-readme", type: "File", name: "README.md", children: null },
  ];

  const flaskStructure = [
    {
      id: "folder-app",
      type: "Folder",
      name: "app",
      children: [
        { id: "file-init", type: "File", name: "__init__.py", children: null },
        { id: "file-routes", type: "File", name: "routes.py", children: null },
      ],
    },
    { id: "file-run", type: "File", name: "run.py", children: null },
    {
      id: "file-requirements",
      type: "File",
      name: "requirements.txt",
      children: null,
    },
    { id: "file-readme", type: "File", name: "README.md", children: null },
  ];

  return (
    <div className="sidebar">
      <h3>Predefined Structures</h3>
      <button onClick={() => loadStructure(reactStructure)}>
        React Structure
      </button>
      <button onClick={() => loadStructure(angularStructure)}>
        Angular Structure
      </button>
      <button onClick={() => loadStructure(nodeStructure)}>
        Node.js Structure
      </button>
      <button onClick={() => loadStructure(vueStructure)}>
        Vue.js Structure
      </button>
      <button onClick={() => loadStructure(flaskStructure)}>
        Flask Structure
      </button>
    </div>
  );
};

export default Sidebar;
