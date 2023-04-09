import React from "react";
import * as PropTypes from "prop-types";
import "./ImageContainer.scss";

export default function ImageContainer({ imgSrc }) {
    return (
        <div className="imageContainer">
            <img src={ imgSrc } alt="VK"/>
        </div>
    );
};

ImageContainer.propTypes = {
    imgSrc: PropTypes.string
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}