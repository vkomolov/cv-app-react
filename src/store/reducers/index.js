import { combineReducers } from "redux";
import alertReducer from "./AlertReducer";
import filterReducer from "./FilterReducer";

const rootReducer = combineReducers({
    alertState: alertReducer,
    filterState: filterReducer
});

export default rootReducer;