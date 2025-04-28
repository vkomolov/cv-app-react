import React, { useEffect, useRef, useState } from "react";
import * as PropTypes from "prop-types";
import { v4 } from "uuid";
import "./SectionList.scss";

function handleFilter(chosenFilter, filterActive, activateFilter) {
    if (chosenFilter !== filterActive) {
        activateFilter(chosenFilter);

        //starting page from the initial position
        window.scrollTo(0, 0);
    }
}

function getScrollHandler(sectionListRef, setFiltersVisible) {
    return () => {
        const sectionListComponent = sectionListRef.current;
        const posTop = sectionListComponent.getBoundingClientRect().top;

        if (posTop <= 0) {
            setFiltersVisible(false);
        } else {
            setFiltersVisible(true);
        }
    }
}

function getOnKeyDownHandler(filterActive, activateFilter) {
    return (event) => {
        if (event.key === "Enter") {
            const filterName = event.target.dataset.filter;
            handleFilter(filterName, filterActive, activateFilter);
        }
    }
}

function getSectionsArr(sectionData) {
    const { filterNames, filterActive, activateFilter } = sectionData;

    const onKeyDownHandler = getOnKeyDownHandler(filterActive, activateFilter);
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
                onClick={ () => handleFilter(filter, filterActive, activateFilter) }
                onKeyDown={ onKeyDownHandler }
                key={v4()}
            >
                { filter }
            </li>
        );
    });
}

function getSectionList(sectionListRef, sectionData, isForScroll = false) {
    return (
        <ul
            className="sectionList"
            role="menu"
            ref={ !isForScroll ? sectionListRef : null }
        >
            {
                getSectionsArr(sectionData)
            }
        </ul>
    )
}

function checkScrolled(filtersVisible, isScrolled, setIsScrolled, isScrolledShown, setIsScrolledShown) {
    if (!filtersVisible) {
        if (!isScrolled) {
            setIsScrolled(true); //setting new state for isScrolled
            setTimeout(() => {
                setIsScrolledShown(true);
            }, 200);
        }
    }
    else {
        if (isScrolledShown) {
            setIsScrolledShown(false);

            setTimeout(() => {
                setIsScrolled(false);
            }, 200);
        }
    }
}

export default function SectionList({ sectionData }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isScrolledShown, setIsScrolledShown] = useState(false);
    const [filtersVisible, setFiltersVisible] = useState(true);  //filters visible:true/invisible:false
    const sectionListRef = useRef(null);

    const styledWrapperOnScroll = isScrolledShown
        ? "wrapper-on-scroll scroll-active"
        : "wrapper-on-scroll";

    const handleScroll = getScrollHandler(sectionListRef, setFiltersVisible);

    //initiating listener on window.scroll
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
        //as componentDidMount
    }, [handleScroll]);

    useEffect(() => {
        checkScrolled(filtersVisible, isScrolled, setIsScrolled, isScrolledShown, setIsScrolledShown)
    }, [filtersVisible, isScrolled, isScrolledShown]);

    return (
        <>
            { isScrolled
            && <div className={ styledWrapperOnScroll }>
                { getSectionList(sectionListRef, sectionData, true) }
            </div>
            }
            { getSectionList(sectionListRef, sectionData, false) }
        </>
    )
}

SectionList.propTypes = {
    sectionData: PropTypes.object.isRequired
};