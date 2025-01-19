import React from "react";
import ReactDom from "react-dom/client";
import App from "./App";
import { Contract } from "./utils/icp";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
window.renderICPromise = Contract()
  .then(() => {
    ReactDom.createRoot(document.getElementById("root")).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  })
  .catch(console.error);
