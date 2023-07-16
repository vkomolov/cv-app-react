import React, { useMemo } from "react";
import * as PropTypes from "prop-types";
import { nanoid } from "@reduxjs/toolkit";

import "./AlertBlock.scss";
import loadingIcon from "../../asset/img/loadingIcon.svg";

export default function AlertBlock({ alertState }) {
    const { alertType, alertContent } = alertState;

    const alertElement = useMemo(() => {
        if (!alertType) return null;

        //only two options for now
        const classNameOut = alertType === "ALERT_ERROR" ? "alert-error" : "alert-loading";
        //looking for the alert text content...
        let contentArr = [];
        if (alertContent.length) {
            contentArr = alertContent.map(text => (
                <span className={ classNameOut } key={nanoid()} >
                    { text }
                </span>
            ));
        }

        return (
            <div id="alert-block">
                <div
                    className="alert-content-block"
                    role="alert"
                >
                    { classNameOut === "alert-loading"
                    && <img src={loadingIcon} alt="loading" /> }
                    { contentArr }
                </div>
            </div>
        );
    }, [alertType, alertContent]);

    return alertElement;
}

AlertBlock.propTypes = {
    alertState: PropTypes.shape({
        alertType: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.oneOf([null])
        ]),
        alertContent: PropTypes.array
    })
};



/////////////////   dev
//  eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}

