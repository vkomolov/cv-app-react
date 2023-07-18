import { call, put, delay } from "redux-saga/effects";
import { getInitialData } from "./initialDataSagas";
import { alertLoading, alertError, alertClear } from "../features/AlertSlice";
import { setData } from "../features/DataSlice";
const jsonUrl = "./asset/pData/cv.json";

export function* loadInitialData(delays=1000) {
    try {
        yield put(alertLoading("Loading"));
        //const startTime = performance.now();
        const auxData = yield call(getInitialData, jsonUrl);
        //const endTime = performance.now();
        //log(endTime - startTime, "time: ");
        //blob saved to localforage then URL.createObjUrl takes it:  initial load: avg 1050ms, from storage: avg 260ms
        //FileReader reads blob and saves to localforage: initial load: avg 1220ms, from storage: avg 311ms

        yield delay(delays);
        yield put(setData(auxData));
        //removing alert loading
        yield put(alertClear());

    } catch (e) {
        yield put(alertError(e.message));
        console.error(e.stack);
    }
}

export default function* rootSaga() {
    //blocking effect for getting initial data
    yield call(loadInitialData, 1000);
}


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}