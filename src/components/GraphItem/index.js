import React, { useMemo, useEffect, useRef } from "react";
import * as PropTypes from "prop-types";
import "./GraphItem.scss";

const initScore = (score = "0") => {
    const outScore = parseInt(score);
    return outScore > 0 ? outScore : 0;
};

export default function GraphItem({ score }) {
    const innScore = score.trim();
    const scoreRef = useRef(null);

/*    const initScore = useCallback((score = "0") => {
        const outScore = parseInt(score);
        return outScore > 0 ? outScore : 0;
    }, []);*/

    const outScoreWidth = useMemo(() => initScore(innScore) + "%", [innScore]);
    //const outScoreWidth = initScore(innScore) + "%";


    useEffect(() => {
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