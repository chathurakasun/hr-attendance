import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import { AttContextProvider } from "./context/att-context";
import { AuthContextProvider } from "./context/auth-context";

// const root = ReactDOM.createRoot(document.getElementById("root"));
ReactDOM.render(
  <AuthContextProvider>
    <AttContextProvider>
      <App />
    </AttContextProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);
