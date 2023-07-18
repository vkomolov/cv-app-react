import { combineReducers } from "redux";
import alertReducer from "./AlertSlice";
import dataReducer from "./DataSlice";

const rootReducer = combineReducers({
    alertState: alertReducer,
    dataState: dataReducer
});

export default rootReducer;