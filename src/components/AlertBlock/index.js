import React from "react";
import * as PropTypes from "prop-types";
import { v4 } from "uuid";

import "./AlertBlock.scss";
import loadingIcon from "../../asset/img/loadingIcon.svg";

export default function AlertBlock({ alertState }) {
    const { alertType, alertContent } = alertState;
    const classNameOut = alertType === "ALERT_ERROR" ? "alert-error" : "alert-loading";

    let contentArr = [];
    if (alertContent.length) {
        contentArr = alertContent.map(text => (
            <span className={ classNameOut } key={v4()} >
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
}

AlertBlock.propTypes = {
    alertState: PropTypes.shape({
        alertType: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.oneOf([null])
        ]),
        alertContent: PropTypes.array.isRequired
    })
};



/////////////////   dev
//  eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}

