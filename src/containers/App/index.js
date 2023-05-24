import React from "react";
import "./App.scss";
import ScrollingTextBar, { scrollingTextData } from "../ScrollingTextBar";
import AsideBar from "../AsideBar";
import ContentBar from "../ContentBar";
import AlertBlock from "../../components/AlertBlock";
import { useInnData } from "../../hooks";
import { prepareData } from "../../utils/services/userService";

const jsonUrl = "./asset/pData/cv.json";

export default function App() {
    const { innData, alertData, filtersData } = useInnData(jsonUrl);
    const { alertState } = alertData;
    const isNotError = alertState.alertType !== "error";
    const auxData = prepareData(innData, filtersData);

    const components = !auxData ? null : (
        <>
            <AsideBar withData={ auxData.asideData } />
            <ContentBar withData={ auxData.contentData }/>
        </>
    );

    return (
        <>
            {
                isNotError && auxData && <ScrollingTextBar data={ scrollingTextData } />
            }
            <div className="totalWrapper">
                { alertState.alertType && <AlertBlock { ...{ alertState } } /> }
                { components }
            </div>
        </>
    );
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}