import React, { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import "./SectionList.scss";
import { providerContext } from "../../DataProvider";

export default function SectionList() {
    const { asideData } = providerContext;

    const [isScrolled, setIsScrolled] = useState(false);
    const [isScrolledShown, setIsScrolledShown] = useState(false);
    const [filtersVisible, setFiltersVisible] = useState(true);  //filters visible:true/invisible:false
    const sectionListRef = useRef(null);

    const { filterNames, filterActive, activateFilter } = asideData();
    const styledWrapperOnScroll = isScrolledShown
        ? "wrapper-on-scroll scroll-active"
        : "wrapper-on-scroll";

    const handleFilter = (chosenFilter) => {
        if (chosenFilter !== filterActive) {
            activateFilter(chosenFilter);

            //starting page from the initial position
            window.scrollTo(0, 0);
        }
    };

    const handleScroll = () => {
        const sectionListComponent = sectionListRef.current;
        const posTop = sectionListComponent.getBoundingClientRect().top;

        if (posTop <= 0) {
            setFiltersVisible(false);
        } else {
            setFiltersVisible(true);
        }
    };

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
                    aria-label={ filter }
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

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}