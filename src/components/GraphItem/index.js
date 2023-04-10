import React from "react";
import * as PropTypes from "prop-types";
import "./GraphItem.scss";

export default function GraphItem({ score }) {
    const getStyle = score => {
        const innScore = score.trim();
        if (parseInt(innScore)) {
            return {
                width: parseInt(innScore) + "%"
            }
        }
        return {}
    };

    return (
        <div className="graphBlock">
            <div style={ getStyle( score ) } className="score" />
        </div>
    );
}

GraphItem.propTypes = {
    score: PropTypes.string.isRequired
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}