import React, { useLayoutEffect } from "react";
import "./Layout.scss";
import AlertBlock from "../../components/AlertBlock";
import ScrollingTextBar, { scrollingTextData } from "../../containers/ScrollingTextBar";
import { Outlet, useNavigate, useMatch } from "react-router-dom";
import { useAlertData } from "../../hooks";

export default function Layout() {
    const navigate = useNavigate();
    const isRoot = useMatch("/");

    //using useLayoutEffect for navigation to another rout before the display renders
    useLayoutEffect(() => {
        //if initial url "/" then to navigate to the default "/personal"
        if(isRoot) navigate("/personal", { replace: true });

    }, [isRoot, navigate]);

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