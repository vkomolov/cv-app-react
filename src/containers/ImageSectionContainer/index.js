import React from "react";
import * as PropTypes from "prop-types";
import "./ImageSectionContainer.scss";
import ImageWrapper from "../../components/ImageWrapper";
import SectionList from "../SectionList";

export default function ImageSectionContainer({ innData }) {
    const { photoUrl, ...sectionData } = innData;

    return (
        <div className="image-section-container" >
            <ImageWrapper
                imgSrc={ photoUrl }
                alt="VKomolov CV"
                className="photoWrapper"
            />
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

