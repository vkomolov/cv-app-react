import React, { useCallback, useEffect, useRef, useState } from "react";
import * as PropTypes from "prop-types";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import "./SectionList.scss";

export default function SectionList({ sectionData }) {
    const navigate = useNavigate();
    const [isScrolledShown, setIsScrolledShown] = useState(false);
    const sectionListRef = useRef(null);

    const { filterNames, filterActive } = sectionData;
    const styledWrapperOnScroll = isScrolledShown
        ? "wrapper-on-scroll scroll-active"
        : "wrapper-on-scroll";
    const handleScroll = useCallback(() => {
        if (sectionListRef) {
            const sectionListComponent = sectionListRef.current;
            const posTop = sectionListComponent.getBoundingClientRect().top;
            const isScrolled = posTop <= 0;
            //setting the state with the same value will be ignored
            setIsScrolledShown(isScrolled);
        }
    },[]);

    const onKeyDownHandler = useCallback((event) => {
        if (event.key === "Enter") {
            const filterName = event.target.dataset.filter;
            handleFilter(filterName, filterActive, navigate);
        }
    }, [filterActive]);

    //initiating listener of scrolling on window.scroll
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
        /*eslint react-hooks/exhaustive-deps:0*/
        //as componentDidMount
    }, []);

    const paramsData = {
        sectionListRef,
        filterNames,
        filterActive,
        onKeyDownHandler,
        navigate
    }

    return (
        <>
            <div className={ styledWrapperOnScroll }>
                { getSectionList(true, paramsData) }
            </div>
            { getSectionList(false, paramsData) }
        </>
    )
}

SectionList.propTypes = {
    sectionData: PropTypes.object.isRequired
};

function handleFilter(chosenFilter, filterActive, navigate) {
    if (chosenFilter !== filterActive) {
        //navigating to the following url;
        navigate(`/${ chosenFilter }`);

        //starting page from the initial position
        window.scrollTo(0, 0);
    }
}

function getSectionsArr(filterNames, filterActive, onKeyDownHandler, navigate) {
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
                onClick={ () => handleFilter(filter, filterActive, navigate) }
                onKeyDown={ onKeyDownHandler }
                key={v4()}
            >
                { filter }
            </li>
        );
    });
}

function getSectionList(isForScroll, { sectionListRef, filterNames, filterActive, onKeyDownHandler, navigate }) {
    return (
        <ul
            className="sectionList"
            role="menu"
            ref={ !isForScroll ? sectionListRef : null }
        >
            {
                getSectionsArr(filterNames, filterActive, onKeyDownHandler, navigate)
            }
        </ul>
    );
}