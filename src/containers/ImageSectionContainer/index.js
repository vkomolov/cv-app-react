import React from "react";
import * as PropTypes from "prop-types";
import "./ImageSectionContainer.scss";
import ImageContainer from "../../components/ImageContainer";
import SectionList from "../SectionList";


export default function ImageSectionContainer({ innData }) {
    log(innData, "innData inside ImageSectionContainer");

    const { photoUrl, ...sectionData } = innData;
    log(sectionData, "sectionData inside ImageSectionContainer");

    return (
        <div className="image-section-container" >
            <ImageContainer imgSrc={ photoUrl } />
            <SectionList {...{ sectionData }} />
        </div>
    );
}

ImageSectionContainer.propTypes = {
    innData: PropTypes.object
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}

