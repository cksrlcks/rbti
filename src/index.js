import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../src/assets/scss/style.scss";

import Rbti from "./lib/rbti";
import rmnData from "./data/ormnData";

//라면데이타 넣어서 rbti인스턴스 생성후 app루트에 prop으로 전달
//원하는곳에서 rbti클래스의 메서드 쓸수잇음
//rmnData넣어서 초기화 필요한데, 데이터는 임시로 db에서 json파일 뽑아서 사용했음, 서버에서 가져와서 넣어줘야함 (각 라면을 좋아하는 사람수등의 데이터 필요)
const rbti = new Rbti(rmnData);

const root = ReactDOM.createRoot(document.getElementById("rbti-root"));
root.render(<App rbti={rbti} />);
