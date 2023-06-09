import { call, put, delay } from "redux-saga/effects";

import { getInitialData } from "./initialDataSagas";
import { setAlertClear, setAlertLoading, setAlertError } from "../reducers/AlertReducer/actions";
import { setDataFilters } from "../reducers/FilterReducer/actions";
import { getFilters } from "../../api";

const jsonUrl = "./asset/pData/cv.json";

export function* loadInitialData() {
    try {
        yield put(setAlertLoading("loading Data..."));
        const auxData = yield call(getInitialData, jsonUrl);

        log(auxData, "auxData from getInitialData");

        const filters = getFilters(auxData);

        log(filters, "filters from getFilters");

        yield delay(1000);
        yield put(setAlertClear());
        yield put(setDataFilters({
            auxData,
            filters
        }));


    } catch (e) {
        yield put(setAlertError(e.message));
        console.error(e.stack, "e.stack");
    }
}

export default function* rootSaga() {
    yield call(loadInitialData);

}


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}