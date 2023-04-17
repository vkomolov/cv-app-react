import React, { Component, Fragment, createRef } from "react";
import * as PropTypes from "prop-types";
import { v4 } from "uuid";
import "./SectionList.scss";

export default class SectionList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isScrolled: false,
            isScrolledShown: false
        };

        this.sectionListRef = createRef();
        this.setFilterActive = this.props.sectionData.setFilterActive;
        this._handleScroll = this._handleScroll.bind(this);
    }

    /**
     * it sets the state on scroll event to mount the SectionList on top of the document, still upper the visual area
     * @param {boolean} bool
     * @private
     */
    _setIsScrolled(bool) {
        this.setState({
            isScrolled: bool,
        });
    }

    /**
     * it sets the state to show the mounted SectionList on top of the document, in the visual area
     * @param {boolean} bool
     * @private
     */
    _setIsShown(bool) {
        this.setState({
            isScrolledShown: bool,
        });
    }

    /**
     * !!! window listener in DOM has its on context, that is why this._handleScroll is bind to this of App
     * @private
     */
    _handleScroll() {
        const sectionListComponent = this.sectionListRef.current;

        const { isScrolled, isScrolledShown } = this.state;
        const posTop = sectionListComponent.getBoundingClientRect().top;

        if (posTop <= 0) {
            if (!isScrolled) {
                this._setIsScrolled(true);

                setTimeout(() => {
                    this._setIsShown(true);
                }, 200);
            }
        } else {
            if (isScrolledShown) {
                this._setIsShown(false);

                setTimeout(() => {
                    this._setIsScrolled(false);
                }, 200);
            }
        }
    }

    /**
     *
     * @param { Object } event
     */
    onKeyDownHandler(event) {
        if (event.key === "Enter") {
            this.setFilterActive(event);
        }
    }

    /**
     *
     * @param { array } filterNames (array of filters from props)
     * @param { string } filterActive (active filter from props)
     * @returns { Array }
     * @private
     */
    _getSectionsArr(filterNames, filterActive) {
        return filterNames.map(filter => {
            let specClass = filter === filterActive
                ? "sectionName specClass"
                : "sectionName toBeHovered";

            return (
                <li
                    className={ specClass }
                    data-filter={ filter }
                    aria-label={ filter }
                    role="menuitem"
                    tabIndex="0"
                    onClick={ this.setFilterActive }
                    onKeyDown={ this.onKeyDownHandler }
                    key={v4()}
                >
                    { filter }
                </li>
            );
        });
    }

    render() {
        const { isScrolled, isScrolledShown } = this.state;
        const { filterNames, filterActive } = this.props.sectionData;
        const styledWrapperOnScroll = isScrolledShown
            ? "wrapper-on-scroll scroll-active"
            : "wrapper-on-scroll";

        /**
         *
         * @param { boolean } isForScroll: is it for the SectionList which will appear on scroll in fixed position
         * @returns { element }
         */
        const getSectionList = (isForScroll = false) => (
            <ul
                className="sectionList"
                role="menu"
                ref={ !isForScroll && this.sectionListRef }
            >
                {
                    this._getSectionsArr(filterNames, filterActive)
                }
            </ul>
        );

        return (
            <Fragment>
                { isScrolled
                    && <div className={ styledWrapperOnScroll }>
                        { getSectionList(true) }
                    </div>
                }
                { getSectionList(false) }
            </Fragment>
        )
    }

    componentDidMount() {
        window.addEventListener("scroll", this._handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this._handleScroll);
    }
}

SectionList.propTypes = {
    sectionData: PropTypes.object.isRequired
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}