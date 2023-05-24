import React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./containers/App";
import "./styles/index.scss";
import store from "./store";

/*
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode >
        <App />
    </React.StrictMode>
);*/

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={ store }>
        <App />
    </Provider>

);