import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/common.css";

// React 앱의 시작점입니다.
// HTML의 <div id="root"></div> 안에 App 컴포넌트를 넣어 화면에 보여줍니다.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);