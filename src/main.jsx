import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { BrowserRouter as Router } from "react-router-dom";

import "@fontsource/sono/400.css";
import "@fontsource/sono/500.css";
import "@fontsource/sono/600.css";
import "@fontsource/sono/700.css";
import "@fontsource/indie-flower";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);
