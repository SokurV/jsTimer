import React from "react";
import ReactDOM from "react-dom/client";
import "../sass/index.sass"
import JsTimer from "./jsTimer.js"

const root = ReactDOM.createRoot(document.querySelector('.root'))
root.render(<JsTimer />)