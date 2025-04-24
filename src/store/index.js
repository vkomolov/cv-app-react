import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";

//!createStore is already deprecated... It is recommended to use Redux Toolkit (RTK) with configureStore...
const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(
        thunk
    )
));

export default store;