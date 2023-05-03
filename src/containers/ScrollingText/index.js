import React, { useEffect, useRef } from "react";
import "./ScrollingText.scss";
import { initScrollingText } from "../../utils/services/userService";
import * as PropTypes from "prop-types";

export default function ScrollingText({data}) {
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

ScrollingText.propTypes = {
    data: PropTypes.shape({
        text: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        isFinite: PropTypes.bool.isRequired
    })
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}