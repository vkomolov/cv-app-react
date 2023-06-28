import React, { useEffect, useRef } from "react";
import "./ScrollingTextBar.scss";
import { initScrollingText } from "../../api";
import * as PropTypes from "prop-types";

export default function ScrollingTextBar({ data }) {
    const refContainer = useRef(null);
    const { text, duration, isFinite } = data;

    useEffect(() => {
        const scrollingText = refContainer.current;
        initScrollingText(scrollingText, duration, isFinite);
        /*eslint react-hooks/exhaustive-deps:0*/
        //componentDidMount Effect
    }, []);

    return (
        text.length &&
        <div id="scrolling-text-wrapper" >
            <p
                className="scrolling-text"
                ref={ refContainer }
            >
                { text }
            </p>
        </div>
    );
}

ScrollingTextBar.propTypes = {
    data: PropTypes.shape({
        text: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        isFinite: PropTypes.bool.isRequired
    })
};

const scrollingText = "To realize the CV App with React, dynamically constructing " +
    "the Components from the fetched JSON file, which then to be temporally stored in the localStorage for 24 hours. " +
    "To make git branches with the realisations: class components, using state and props drilling, stateless functions " +
    "on hooks and using Redux-saga which will be merged as the final version. "
    + "The link to the code is available in the section \"Experience\"... ";

export const scrollingTextData = {
    text: scrollingText,
    duration: 50000,
    isFinite: true,
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}