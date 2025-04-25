import React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./app";
import "./styles/index.scss";
import store from "./store";

//import reportWebVitals from "./reportWebVitals";

//reportWebVitals(console.log);   //logging metrics

/*
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode >
        <app />
    </React.StrictMode>
);*/

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={ store }>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>

);