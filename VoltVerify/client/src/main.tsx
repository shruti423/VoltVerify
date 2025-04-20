import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { VerificationProvider } from "./context/verification-context";

createRoot(document.getElementById("root")!).render(
  <VerificationProvider>
    <App />
  </VerificationProvider>
);
