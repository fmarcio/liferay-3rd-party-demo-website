import "@clayui/css/lib/css/atlas.css";

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { RecommendationsProvider } from "./contexts/RecommendationsContext";

ReactDOM.render(
  <React.StrictMode>
    <RecommendationsProvider>
      <App />
    </RecommendationsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
