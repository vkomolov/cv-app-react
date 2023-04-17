import React from "react";
import * as PropTypes from "prop-types";
import "./GraphSection.scss";
import GraphItem from "../GraphItem";

export default function GraphSection({ data }) {
    const { title, details } = data;

    return (
        <div
            className="graph-section"
        >
            <span
                className="subHeading"
            >
                {title}
            </span>
            <GraphItem score={details} />
        </div>
    );
}

GraphSection.propTypes = {
    data: PropTypes.objectOf(PropTypes.string).isRequired
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}