import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import * as PropTypes from "prop-types";
import { v4 } from "uuid";
import "./SectionList.scss";

export default function SectionList({ sectionData }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isScrolledShown, setIsScrolledShown] = useState(false);
    const [filtersVisible, setFiltersVisible] = useState(true);  //filters visible:true/invisible:false
    const sectionListRef = useRef(null);

    const { filterNames, filterActive } = sectionData;
    const styledWrapperOnScroll = isScrolledShown
        ? "wrapper-on-scroll scroll-active"
        : "wrapper-on-scroll";

/*    const handleFilter = (chosenFilter) => {
        if (chosenFilter !== filterActive) {
            activateFilter(chosenFilter);

            //starting page from the initial position
            window.scrollTo(0, 0);
        }
    };*/

    const handleScroll = () => {
        const sectionListComponent = sectionListRef.current;
        const posTop = sectionListComponent.getBoundingClientRect().top;

        if (posTop <= 0) {
            setFiltersVisible(false);
        } else {
            setFiltersVisible(true);
        }
    };

/*    const onKeyDownHandler = (event) => {
        if (event.key === "Enter") {
            const filterName = event.target.dataset.filter;
            handleFilter(filterName);
        }
    };*/

    const getSectionsArr = () => {
        return filterNames.map(filter => {
            let specClass = filter === filterActive
                ? "sectionName specClass"
                : "sectionName toBeHovered";

            return (
                <NavLink to={ `/${ filter }` }
                    className={ specClass }
                    aria-label={ filter }
                    data-filter={ filter }
                    /*role="link"*/
                    tabIndex="0"
/*                    onClick={ () => handleFilter(filter) }
                    onKeyDown={ onKeyDownHandler }*/
                    key={v4()}
                >
                    { filter }
                </NavLink>
            );
        });
    };

    const getSectionList = (isForScroll = false) => (
        <nav
            className="nav-list"
            role="navigation"
            aria-label="filter service"
            ref={ !isForScroll ? sectionListRef : null }
        >
            {
                getSectionsArr()
            }
        </nav>
    );

    //initiating listener on window.scroll
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
        /*eslint react-hooks/exhaustive-deps:0*/
        //as componentDidMount
    }, []);

    useEffect(() => {
        if (!filtersVisible) {
            if (!isScrolled) {
                setIsScrolled(true); //setting new state for isScrolled
                setTimeout(() => {
                    setIsScrolledShown(true);
                }, 200);
            }
        } else {
            if (isScrolledShown) {
                setIsScrolledShown(false);

                setTimeout(() => {
                    setIsScrolled(false);
                }, 200);
            }
        }
    }, [filtersVisible]);

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

SectionList.propTypes = {
    sectionData: PropTypes.object.isRequired
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}