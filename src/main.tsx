import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { SettingsProvider } from "./context/SettingsContext.tsx";
import { SolutionProvider } from "./context/SolutionContext.tsx";

import App from "./App.tsx";

import "./index.css";
import "./fonts.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SettingsProvider>
      <SolutionProvider>
        <App />
      </SolutionProvider>
    </SettingsProvider>
  </StrictMode>
);
