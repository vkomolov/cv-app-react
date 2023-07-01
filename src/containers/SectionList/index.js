import React, { useCallback, useEffect, useRef, useState } from "react";
import * as PropTypes from "prop-types";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import "./SectionList.scss";

export default function SectionList({ sectionData }) {
    log("SectionList rendering...");

    const navigate = useNavigate();
    const [isScrolledShown, setIsScrolledShown] = useState(false);
    log(isScrolledShown, "isScrolledShown...");
    const sectionListRef = useRef(null);

    const { filterNames, filterActive } = sectionData;
    const styledWrapperOnScroll = isScrolledShown
        ? "wrapper-on-scroll scroll-active"
        : "wrapper-on-scroll";

    const handleFilter = (chosenFilter) => {
        if (chosenFilter !== filterActive) {
            //navigating to the following url;
            navigate(`/${ chosenFilter }`);

            //starting page from the initial position
            window.scrollTo(0, 0);
        }
    };

    const handleScroll = useCallback(() => {
        if (sectionListRef) {
            const sectionListComponent = sectionListRef.current;
            const posTop = sectionListComponent.getBoundingClientRect().top;
            const isScrolled = posTop <= 0;
            //setting the state with the same value will be ignored
            setIsScrolledShown(isScrolled);
        }
    },[]);

    const onKeyDownHandler = (event) => {
        if (event.key === "Enter") {
            const filterName = event.target.dataset.filter;
            handleFilter(filterName);
        }
    };

    const getSectionsArr = () => {
        return filterNames.map(filter => {
            let specClass = filter === filterActive
                ? "sectionName specClass"
                : "sectionName toBeHovered";

            return (
                <li
                    className={ specClass }
                    aria-label={ `navigation to /${ filter }` }
                    /*for onKeyDownHandler*/
                    data-filter={ filter }
                    role="menuitem"
                    tabIndex="0"
                    onClick={ () => handleFilter(filter) }
                    onKeyDown={ onKeyDownHandler }
                    key={v4()}
                >
                    { filter }
                </li>
            );
        });
    };

    const getSectionList = (isForScroll = false) => (
        <ul
            className="sectionList"
            role="menu"
            ref={ !isForScroll ? sectionListRef : null }
        >
            {
                getSectionsArr()
            }
        </ul>
    );

    //initiating listener of scrolling on window.scroll
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
        /*eslint react-hooks/exhaustive-deps:0*/
        //as componentDidMount
    }, []);

    return (
        <>
            <div className={ styledWrapperOnScroll }>
                { getSectionList(true) }
            </div>
            { getSectionList(false) }
        </>
    )
}

SectionList.propTypes = {
    sectionData: PropTypes.object.isRequired
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}