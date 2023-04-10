import React from "react";
import * as PropTypes from "prop-types";
import "./AsideItem.scss";
import GraphSection from "../GraphSection";
import { v4 } from "uuid";

export default function AsideItem({ data }) {
    log(data, "data inside AsideItem");
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
                    key={ v4() }
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