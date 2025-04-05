import React from "react";
import * as ReactDOM from "react-dom/client";
//import reportWebVitals from "./reportWebVitals";

import App from "./containers/App";
import "./styles/index.scss";

/*
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode >
        <App />
    </React.StrictMode>
);*/

//reportWebVitals(console.log);   //logging metrics

ReactDOM.createRoot(document.getElementById("root")).render(
    <App />
);