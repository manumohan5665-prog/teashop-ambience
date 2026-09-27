import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";

import { AudioProvider } from "./context/AudioContext";

import "./index.css";
import "./App.css";

createRoot(
  document.getElementById("root")
).render(

  <StrictMode>

    <AudioProvider>

      <App />

    </AudioProvider>

  </StrictMode>
);