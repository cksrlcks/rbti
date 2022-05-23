import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../src/assets/scss/style.scss";

import Rbti from "./lib/rbti";
import { BrowserRouter } from "react-router-dom";

const rbti = new Rbti();
//rbti.set(rmn_data, question) //라면데이터, 질문셋팅
//rbti.eval(answer) //평가

const root = ReactDOM.createRoot(document.getElementById("rbti-root"));
root.render(
    <BrowserRouter>
        <App rbti={rbti} />
    </BrowserRouter>
);
