import React from "react";
import * as PropTypes from "prop-types";
import "./AsideItem.scss";
import GraphSection from "../GraphSection";
import { nanoid } from "@reduxjs/toolkit";

export default function AsideItem({ data }) {
    const { title, details } = data;
    let content;

    //  details can be absent
    if (details) {
        if (typeof details === "string") {
            content = (
                <span
                    className="spanDetails"
                >
                    {details}
                </span>
            );
        } else if (Array.isArray(details) && details.length) {
            content = details.map(graphData => (
                <GraphSection
                    data={ graphData }
                    key={ nanoid() }
                />
            ));
        }
    }


    return (
        <div className="aside-item-wrapper">
            <h3>{ title }</h3>
            { content }
        </div>
    );
}

AsideItem.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.string.isRequired,
        details: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array
        ]),
    })
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}