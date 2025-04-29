import React, { useEffect, useRef, useState } from "react";
import * as PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./SectionList.scss";

function handleFilter(chosenFilter, filterActive, navigate) {
    if (chosenFilter !== filterActive) {
        //navigating to the following url;
        navigate(`/${ chosenFilter }`);

        //starting page from the initial position
        window.scrollTo(0, 0);
    }
}

function getScrollHandler(sectionListRef, setIsScrolledShown) {
    return () => {
        if (sectionListRef) {
            const sectionListComponent = sectionListRef.current;
            const posTop = sectionListComponent.getBoundingClientRect().top;
            const isScrolled = posTop <= 0;
            //setting the state with the same value will be ignored
            setIsScrolledShown(isScrolled);
        }
    }
}

function getOnKeyDownHandler(filterActive, navigate) {
    return (event) => {
        if (event.key === "Enter") {
            const chosenFilter = event.target.dataset.filter;
            handleFilter(chosenFilter, filterActive, navigate);
        }
    }
}

function getSectionsArr(sectionData, navigate) {
    const { filterNames, filterActive } = sectionData;
    const onKeyDownHandler = getOnKeyDownHandler(filterActive, navigate);
    return filterNames.map(filter => {
        let specClass = filter === filterActive
            ? "sectionName specClass"
            : "sectionName toBeHovered";

        return (
            <li
                className={ specClass }
                aria-label={ `navigation to /${ filter }` }
                data-filter={ filter }
                role="menuitem"
                tabIndex="0"
                onClick={ () => handleFilter(filter, filterActive, navigate) }
                onKeyDown={ onKeyDownHandler }
                key={filter}
            >
                { filter }
            </li>
        );
    });
}

function getSectionList(sectionListRef, sectionData, navigate, isForScroll = false) {
    return (
        <ul
            className="sectionList"
            role="menu"
            ref={ !isForScroll ? sectionListRef : null }
        >
            {
                getSectionsArr(sectionData, navigate)
            }
        </ul>
    )
}

export default function SectionList({ sectionData }) {
    const navigate = useNavigate();
    const [isScrolledShown, setIsScrolledShown] = useState(false);
    const sectionListRef = useRef(null);

    const styledWrapperOnScroll = isScrolledShown
        ? "wrapper-on-scroll scroll-active"
        : "wrapper-on-scroll";

    //initiating listener of scrolling on window.scroll
    useEffect(() => {
        const handleScroll = getScrollHandler(sectionListRef, setIsScrolledShown);
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [sectionListRef, setIsScrolledShown]);

    return (
        <>
            <div className={ styledWrapperOnScroll }>
                { getSectionList(sectionListRef, sectionData, navigate, true) }
            </div>
            { getSectionList(sectionListRef, sectionData, navigate, false) }
        </>
    )
}

SectionList.propTypes = {
    sectionData: PropTypes.shape({
        filterNames: PropTypes.arrayOf(PropTypes.string).isRequired,
        filterActive: PropTypes.string.isRequired,
    }).isRequired
};