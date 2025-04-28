import { call, put, delay, fork } from "redux-saga/effects";
import { getInitialData } from "./initialDataSagas";
import { setAlertClear, setAlertError, setAlertLoading } from "../reducers/AlertReducer/actions";
import { setDataFilters } from "../reducers/FilterReducer/actions";
import { getFilters } from "../../api";

const jsonUrl = "./asset/pData/cv.json";

export function* loadInitialData(delays=1000) {
    try {
        yield put(setAlertLoading(["Loading Data..."]));
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
    yield fork(loadInitialData, 1000);
}