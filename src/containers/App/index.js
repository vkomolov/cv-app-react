import React from "react";
import "./App.scss";
import ScrollingTextBar, { scrollingTextData } from "../ScrollingTextBar";
import AsideBar from "../AsideBar";
import ContentBar from "../ContentBar";
import AlertBlock from "../../components/AlertBlock";
import { useInnData } from "../../hooks";


export default function App() {
    const { innData, alertState } = useInnData();
    const isNotError = alertState.alertType !== "ALERT_ERROR";
    log(isNotError, "isNotError: ");


    const components = !innData ? null : (
        <>
            <AsideBar withData={ innData.asideData } />
            <ContentBar withData={ innData.contentData }/>
        </>
    );

    return (
        <>
            {
                isNotError && innData && <ScrollingTextBar data={ scrollingTextData } />
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