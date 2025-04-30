import rootReducer from "./features";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

// Создание middleware
const sagaMiddleware = createSagaMiddleware();

// Используем встроенную функцию для конфигурации middleware
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: true,
            serializableCheck: true,
            thunk: false,   //we use redux-saga
        }).concat(sagaMiddleware),
    devTools: process.env.NODE_ENV !== "production",
});

// Запуск саги
sagaMiddleware.run(rootSaga);

export default store;