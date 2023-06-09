import { call, put, delay } from "redux-saga/effects";
import { getInitialData } from "./initialDataSagas";
import { setAlertClear, setAlertError } from "../reducers/AlertReducer/actions";
import { setDataFilters } from "../reducers/FilterReducer/actions";
import { getFilters } from "../../api";

const jsonUrl = "./asset/pData/cv.json";

export function* loadInitialData(delays=1000) {
    try {
        const auxData = yield call(getInitialData, jsonUrl);
        const filters = getFilters(auxData);
        yield delay(delays);
        yield put(setAlertClear());
        yield put(setDataFilters({
            auxData,
            filters
        }));

    } catch (e) {
        yield put(setAlertError(e.message));
        console.error(e.stack);
    }
}

export default function* rootSaga() {
    yield call(loadInitialData, 1000);
}


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}