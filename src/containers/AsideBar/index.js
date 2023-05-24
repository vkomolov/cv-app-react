import React from "react";
import "./AsideBar.scss";
import * as PropTypes from "prop-types";
import ImageSectionContainer from "../ImageSectionContainer";
import AsideContent from "../AsideContent";

export default function AsideBar({ withData }) {
    const {
        data,
        fullName,
        ...innData
    } = withData;


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
    withData: PropTypes.object
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}