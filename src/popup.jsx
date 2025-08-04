import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; // Or your actual popup component
import { HashRouter } from "react-router-dom";
import "./index.css"; // Import your global styles

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <App />
  </HashRouter>
);
