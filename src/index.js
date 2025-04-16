import React from "react";
import * as ReactDOM from "react-dom/client";

import App from "./containers/App";
import "./styles/index.scss";

// testing loading metrics //
//import reportWebVitals from "./reportWebVitals";
//reportWebVitals(console.log);   //logging metrics

/*
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode >
        <App />
    </React.StrictMode>
);*/

ReactDOM.createRoot(document.getElementById("root")).render(
    <App />
);