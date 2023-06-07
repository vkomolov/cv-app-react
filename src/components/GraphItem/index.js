import React, { useCallback, useEffect, useRef } from "react";
import * as PropTypes from "prop-types";
import "./GraphItem.scss";

export default function GraphItem({ score }) {
    const innScore = score.trim();
    const scoreRef = useRef(null);

    const initScore = useCallback((score = "0") => {
        const outScore = parseInt(score);
        return outScore > 0 ? outScore : 0;
    }, []);

    const outScoreWidth = initScore(innScore) + "%";

    useEffect(() => {
        log(innScore, "innScore");
        const { current } = scoreRef;
        setTimeout(() => {
            current.style.width = outScoreWidth;
        }, 300);
        /*eslint react-hooks/exhaustive-deps:0*/
        //componentDidMount effect
    }, [outScoreWidth]);

    return (
        <div className="graphBlock"
             title={ outScoreWidth }
        >
            <div
                className="score"
                ref={ scoreRef }
            />
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