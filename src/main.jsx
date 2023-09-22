import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider> */}
    <App />
  </React.StrictMode>
);