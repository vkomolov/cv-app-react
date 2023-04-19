import React from "react";
import * as PropTypes from "prop-types";
import "./ImageWrapper.scss";

/**
 *
 * @param {string} imgSrc - url of the image
 * @param {string} alt - alt parameter for the image
 * @param {string} className - additional className for the wrapper of the image
 * @param {Object} params - will be written to inline styles of the wrapper
 * @param {array} children - possible children in wrapper
 * @returns {Element} - JSX Element
 * @constructor
 */
export default function ImageWrapper({ imgSrc, alt, className, params, children }) {
    const classNameOut= className && className.length
        ? `imageWrapper ${className}`
        : "imageWrapper";
    let inlineStyle = null;
    if (params && Object.keys(params).length) {
        inlineStyle = {
            ...params
        }
    }

    return (
        <div
            className={ classNameOut }
            style={ inlineStyle }
        >
            <img
                src={ imgSrc }
                alt={ alt }
            />
            {children && children}
        </div>
    );
};

ImageWrapper.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    className: PropTypes.string,
    params: PropTypes.object,
    children: PropTypes.object
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}