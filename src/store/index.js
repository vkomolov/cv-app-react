import rootReducer from "./features";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

const sagaMiddleWare = createSagaMiddleware();
const middleware = getDefaultMiddleware({
    immutableCheck: true,
    serializableCheck: true,
    thunk: false,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: middleware.concat(sagaMiddleWare),
    devTools: process.env.NODE_ENV !== "production"
});

sagaMiddleWare.run(rootSaga);

export default store;