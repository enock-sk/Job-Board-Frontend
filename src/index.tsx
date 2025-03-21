import React from "react";
import ReactDOM from "react-dom/client"; // Import from 'react-dom/client' for React 18
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Create a root element using React 18's new API
const root = ReactDOM.createRoot(document.getElementById("root")!);

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
