import { combineReducers } from "redux";
import alertReducer from "./AlertReducer";
import dataReducer from "./DataReducer";

const rootReducer = combineReducers({
    alertState: alertReducer,
    dataState: dataReducer
});

export default rootReducer;