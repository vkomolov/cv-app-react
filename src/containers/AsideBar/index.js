import React from "react";
import * as PropTypes from "prop-types";

import "./AsideBar.scss";


export default function AsideBar({ data }) {

    log(data, "data inside AsideBar");

    return (
        <div className="asideBar">
            AsideBar
        </div>
    );
}

AsideBar.proptypes = {
    data: PropTypes.object
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}