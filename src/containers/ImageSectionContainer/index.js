import React, { useContext } from "react";
import "./ImageSectionContainer.scss";
import ImageWrapper from "../../components/ImageWrapper";
import SectionList from "../SectionList";
import { AsideContext } from "../App";

export default function ImageSectionContainer() {
    const asideData = useContext(AsideContext);
    const { photoUrl } = asideData;

    return (
        <div className="image-section-container" >
            <ImageWrapper
                imgSrc={ photoUrl }
                alt="VKomolov CV"
                className="photoWrapper"
            />
            <SectionList />
        </div>
    );
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}

