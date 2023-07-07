import React from "react";
import ReactDOM from "react-dom/client";
import { PDFViewer } from "@react-pdf/renderer";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <PDFViewer style={{ flex: 1 }}>
      <App />
    </PDFViewer>
  </React.StrictMode>
);

reportWebVitals();
