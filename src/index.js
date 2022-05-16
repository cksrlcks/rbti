import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../src/assets/css/style.scss";

import Rbti from "./lib/rbti";
import rmnData from "./data/ormnData";

const rbti = new Rbti(rmnData);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App rbti={rbti} />
    </React.StrictMode>
);
