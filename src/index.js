import React from "react";
import ReactDOM from "react-dom/client";
import Cal from "./Cal";
import Calculator from "./Calculator";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Cal />
    <Calculator />
  </React.StrictMode>
);
