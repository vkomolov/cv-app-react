import { call, put, delay } from "redux-saga/effects";
import { getInitialData } from "./initialDataSagas";
import { setAlertClear, setAlertError, setAlertLoading } from "../reducers/AlertReducer/actions";
import { setData } from "../reducers/DataReducer/actions";
const jsonUrl = "./asset/pData/cv.json";

export function* loadInitialData(delays=1000) {
    try {
        yield put(setAlertLoading("Loading"));
        const auxData = yield call(getInitialData, jsonUrl);
        yield delay(delays);
        yield put(setData(auxData));
        //removing alert loading
        yield put(setAlertClear());

    } catch (e) {
        yield put(setAlertError(e.message));
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