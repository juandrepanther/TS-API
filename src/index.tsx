import React from "react";
import ReactDOM from "react-dom";
import "./styles/All.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
