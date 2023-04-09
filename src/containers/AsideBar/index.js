import React from "react";
import * as PropTypes from "prop-types";

import "./AsideBar.scss";
import ImageSectionContainer from "../ImageSectionContainer";

export default function AsideBar({ asideData }) {
    log(asideData, "innData inside AsideBar");

     const {
         data,
         fullName,
         ...innData
     } = asideData;

    log(data, "data inside AsideBar");

    return (
        <div className="asideBar">
            <h1 className="hero-name">
                { fullName }
            </h1>
            <ImageSectionContainer {...{ innData }} />
        </div>
    );
}

AsideBar.propTypes = {
    asideData: PropTypes.object
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}