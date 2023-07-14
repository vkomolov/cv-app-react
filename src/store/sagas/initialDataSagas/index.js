import { call } from "redux-saga/effects";
import { getAndStore } from "../../../api";

export function* getInitialData(jsonUrl) {
    const innData = yield call(getAndStore, jsonUrl, 1);

    if (innData["photoUrl"]) {
        const blobData = yield call(getAndStore, innData["photoUrl"], 1, "blob");
        if (blobData) {
            const objUrl = URL.createObjectURL(blobData);
            Object.assign(innData, { photoUrl: objUrl })
        }
    }

    return innData;
}


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}