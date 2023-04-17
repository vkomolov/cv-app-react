import React, { Component, createRef } from "react";
import "./ScrollingText.scss";
import * as PropTypes from "prop-types";

export default class ScrollingText extends Component {
    constructor(props) {
        super(props);

        this.refContainer = createRef();
    }

    _initScrollingText(elem, duration, isInfinite = false) {
        let startTime = null;
        const textWrapper = elem.parentElement;
        const distanceGap = 10;
        const initialLeft = textWrapper.offsetWidth + distanceGap + "px";

        elem.style.left = initialLeft;

        const initialLeftNum = parseInt(elem.style.left);
        const distance = elem.offsetWidth + textWrapper.offsetWidth + distanceGap;

        const refreshTextPos = () => {
            elem.remove();
            elem.style.left = initialLeft;
            textWrapper.append(elem);
        };


        requestAnimationFrame(function measure(time) {
            if (!startTime) {
                startTime = time;
            }
            //getting the percentage of time, passed from startTime...
            let progress = (time - startTime)/duration;   //from 0 to 1
            if (progress > 1) {
                progress = 1;
            }

            //getting the portion of distance to animate
            let shift = distance * progress;
            elem.style.left = (initialLeftNum - shift) + "px";

            if (progress < 1) {
                requestAnimationFrame(measure);
            } else {
                /**
                 * if fulfilled, then to replace the scrolling element to the initial not visible position
                 * only in case of isInfinite === true
                 */
                if (isInfinite) {
                    refreshTextPos();
                    startTime = null;
                    requestAnimationFrame(measure);
                }
            }
        });

    }

    render() {
        const { text } = this.props.data;

        return (
            text &&
            <div id="scrolling-text-wrapper" >
                <p
                    className="scrolling-text"
                    ref={ this.refContainer }
                >
                    { text }
                </p>
            </div>
        );
    }

    componentDidMount() {
        const { duration, isFinite } = this.props.data;
        const scrollingText = this.refContainer.current;
        this._initScrollingText(scrollingText, duration, isFinite);
    }
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