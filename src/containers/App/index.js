import React from "react";
import "./App.scss";
import ScrollingTextBar, { scrollingTextData } from "../ScrollingTextBar";
import AsideBar from "../AsideBar";
import ContentBar from "../ContentBar";
import AlertBlock from "../../components/AlertBlock";
import { useInitData } from "../../hooks";
import { prepareData } from "../../utils/services/userService";

/**
 * The context Providers were made just for demonstration of its usage... but in this case of app, it is no need
 * for context creations, because each child component is in need for a part of the data passed in props and further
 * they pass the rest of the data deeper in the tree of the children...
 */
import DataProvider from "../../DataProvider";

const jsonUrl = "./asset/pData/cv.json";

export default function App() {
    const { innData, alertData, filtersData } = useInitData(jsonUrl);
    const { alertState } = alertData;
    const isNotError = alertState.alertType !== "error";
    const auxData = prepareData(innData, filtersData);

    const components = !auxData ? null : (
        <>
            <DataProvider name="asideData" data={ auxData.asideData } >
                <AsideBar />
            </DataProvider>
            <DataProvider name="contentData" data={ auxData.contentData } >
                <ContentBar />
            </DataProvider>
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