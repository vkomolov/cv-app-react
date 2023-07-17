import React, { useEffect } from "react";
import AsideBar from "../../containers/AsideBar";
import ContentBar from "../../containers/ContentBar";
import { useInnData, useRoutesData } from "../../hooks";
import { useNavigate } from "react-router-dom";

const RootContainer = () => {
    const { auxData, filters, filter } = useRoutesData();
    const navigate = useNavigate();

    useEffect(() => {
        //if the initial filter in params is not correct then to navigate to the default filters[0]
        if (filter && filters.length) {
            if (!filters.includes(filter)) {
                navigate(`/${ filters[0] }`, { replace: true });
            }
        }
    }, [filters, filter, navigate]);

    const { innData } = useInnData(auxData, filters, filter);

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