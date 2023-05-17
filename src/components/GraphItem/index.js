import React, { useEffect, useRef } from "react";
import * as PropTypes from "prop-types";
import "./GraphItem.scss";

export default function GraphItem({ score }) {
    const innScore = score.trim();
    const scoreRef = useRef(null);

    const initScore = (score = "0") => {
        const outScore = parseInt(score);
        return outScore > 0 ? outScore : 0;
    };

    useEffect(() => {
        const { current } = scoreRef;
        setTimeout(() => {
            current.style.width = initScore(innScore) + "%";
        }, 300);
        /*eslint react-hooks/exhaustive-deps:0*/
        //componentDidMount effect
    }, []);

    return (
        <div className="graphBlock" >
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