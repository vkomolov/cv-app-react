import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers";
import { composeWithDevTools } from "@redux-devtools/extension";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

const sagaMiddleWare = createSagaMiddleware();

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(
        sagaMiddleWare
    )
));

sagaMiddleWare.run(rootSaga);

export default store;