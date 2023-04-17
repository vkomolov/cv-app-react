import React, { Component, createRef } from "react";
import * as PropTypes from "prop-types";
import "./GraphItem.scss";

export default class GraphItem extends Component {
    constructor(props) {
        super(props);

        this.score = this.props.score.trim();
        this.ref = createRef();
    }

    initScore(score="0") {
        const outScore = parseInt(score);
        return outScore > 0 ? outScore : 0;
    }

    render() {

        return (
            <div className="graphBlock" >
                <div
                    className="score"
                    ref={ this.ref }
                />
            </div>
        );
    }

    componentDidMount() {
        const { current } = this.ref;

        setTimeout(() => {
            current.style.width = this.initScore(this.score) + "%";
        }, 300);
    }
}

GraphItem.propTypes = {
    score: PropTypes.string.isRequired
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}