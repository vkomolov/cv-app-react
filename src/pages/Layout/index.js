import React, { useEffect } from "react";
import "./Layout.scss";
import AlertBlock from "../../components/AlertBlock";
import ScrollingTextBar, { scrollingTextData } from "../../containers/ScrollingTextBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useAlertData, useRoutesData } from "../../hooks";

export default function Layout() {
    const navigate = useNavigate();
    const { isRootRoute, filters } = useRoutesData();

    useEffect(() => {
        //if initial url "/" and the data is fetched with the filters then to navigate to the default filters[0]
        if(isRootRoute && filters.length) navigate(`/${ filters[0] }`, { replace: true });
    }, [isRootRoute, filters, navigate]);

    const { alertState } = useAlertData();

    return (
        <>
            {
                !alertState.alertType && <ScrollingTextBar data={ scrollingTextData } />
            }
            <div className="totalWrapper">
                { alertState.alertType && <AlertBlock { ...{ alertState } } /> }
                <Outlet />
            </div>
        </>
    );
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}