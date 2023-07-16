import React from "react";
import AsideBar from "../../containers/AsideBar";
import ContentBar from "../../containers/ContentBar";
import { useInnData } from "../../hooks";

const RootContainer = () => {

    const { innData } = useInnData();

    return !innData ? null : (
        <>
            <AsideBar withData={ innData.asideData } />
            <ContentBar withData={ innData.contentData }/>
        </>
    );
};

export default RootContainer;

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}