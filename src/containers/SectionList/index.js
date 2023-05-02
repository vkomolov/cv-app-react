/*eslint no-unused-vars:0*/
import React, { Component, createRef } from "react";
import * as PropTypes from "prop-types";
import { v4 } from "uuid";
import "./SectionList.scss";

/*export default function SectionListVer({ sectionData }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isScrolledShown, setIsScrolledShown] = useState(false);

    const { filterNames, filterActive, setFilterActive } = sectionData;


}*/

export default class SectionList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isScrolled: false,
            isScrolledShown: false
        };

        //this.filterNames = this.props.sectionData.filterNames;
        //this.filterActive = this.props.sectionData.filterActive;
        this.setDataFilters = this.props.sectionData.setDataFilters;
        this.sectionListRef = createRef();
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
     * @param innFilterName
     * @param filterActive
     */
    setFilterActive(innFilterName, filterActive) {
        if (innFilterName !== filterActive) {
            this.setDataFilters(prevDataFilters => {
                return prevDataFilters.map(filter => {
                    const isActive = filter.filterName === innFilterName;
                    return {
                        ...filter,
                        isActive
                    };
                });
            });

            //starting page from the initial position
            window.scrollTo(0, 0);
        }
    }

    /**
     *
     * @param { Object } event
     */
    onKeyDownHandler(event) {
        if (event.key === "Enter") {
            const filterName = event.target.dataset.filter;
            this.setFilterActive(filterName);
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
                    aria-label={ filter }
                    data-filter={ filter }
                    role="menuitem"
                    tabIndex="0"
                    onClick={ () => this.setFilterActive(filter, filterActive) }
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
            <>
                { isScrolled
                    && <div className={ styledWrapperOnScroll }>
                        { getSectionList(true) }
                    </div>
                }
                { getSectionList(false) }
            </>
        )
    }

    componentDidMount() {
        window.addEventListener("scroll", this._handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this._handleScroll);
    }

    componentDidUpdate() {
        log("SectionList update:");

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