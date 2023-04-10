import React from "react";
import * as PropTypes from "prop-types";

import "./AsideBar.scss";
import ImageSectionContainer from "../ImageSectionContainer";
import AsideContent from "../AsideContent";

export default function AsideBar({ asideData }) {
    //log(asideData, "asideData inside AsideBar");

     const {
         data,
         fullName,
         ...innData
     } = asideData;

    //log(data, "data inside AsideBar");
    //log(innData, "innData inside AsideBar");

    return (
        <aside className="asideBar">
            <h1 className="hero-name">
                { fullName }
            </h1>
            <ImageSectionContainer {...{ innData }} />
            <AsideContent {...{ data }} />
        </aside>
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