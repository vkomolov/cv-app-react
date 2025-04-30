import React from "react";
import * as PropTypes from "prop-types";
import "./ImageWrapper.scss";

/**
 * @param {string} imgSrc - url of the image
 * @param {string} alt - alt parameter for the image
 * @param {string} className - additional className for the wrapper of the image
 * @param {Object} inlineStyles - additional inline styles will be written to the wrapper
 * @param {React.ReactElement[]} children - possible children in wrapper
 * @returns {Element} - JSX Element
 * @constructor
 */
export default function ImageWrapper(
    {
        imgSrc,
        alt,
        className,
        inlineStyles,
        children,
    }) {

    const classNameOut = className && className.length
        ? `imageWrapper ${ className }`
        : "imageWrapper";
    let inlineStyle = null;
    if (inlineStyles && Object.keys(inlineStyles).length) {
        inlineStyle = {
            ...inlineStyles,
        };
    }

    const childrenWrapped = children && children.length ? (
        <div className="image-info">
            { children }
        </div>
    ) : null;

    return (
        <div
            className={ classNameOut }
            style={ inlineStyle }
        >
            <img
                src={ imgSrc }
                alt={ alt }
            />
            { childrenWrapped }
        </div>
    );
};

ImageWrapper.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    className: PropTypes.string,
    inlineStyles: PropTypes.object,
    children: PropTypes.array,
};