import { call } from "redux-saga/effects";
import { getAndStore } from "../../../api";

export function* getInitialData(jsonUrl) {
    log("getInitialData:");
    const innData = yield call(getAndStore, jsonUrl, 1, "json");

    if (innData["photoUrl"]) {
        const objUrlData = yield call(getAndStore, innData["photoUrl"], 1, "blob");
        Object.assign(innData, { photoUrl: objUrlData })
    }

    return innData;
}


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}