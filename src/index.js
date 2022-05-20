import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../src/assets/scss/style.scss";

import Rbti from "./lib/rbti";

const rbti = new Rbti();

const root = ReactDOM.createRoot(document.getElementById("rbti-root"));
root.render(<App rbti={rbti} />);
