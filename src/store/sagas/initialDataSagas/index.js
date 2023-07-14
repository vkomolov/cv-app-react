import { call } from "redux-saga/effects";
import { getAndStore } from "../../../api";

export function* getInitialData(jsonUrl) {
    const innData = yield call(getAndStore, jsonUrl, 1);

    log(innData, "innData from getInitialData: ");

    if (innData["photoUrl"]) {
        const objUrlData = yield call(getAndStore, innData["photoUrl"], 1, "blob");

        log(objUrlData, "objUrlData from getInitialData: ");
        if (objUrlData) {
            Object.assign(innData, { photoUrl: objUrlData })
        }

    }

    log(innData, "final innData from getInitialData: ");

    return innData;
}


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}