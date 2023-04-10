import React from "react";
import * as PropTypes from "prop-types";
import { v4 } from "uuid";
import "./SectionList.scss";

export default function SectionList({ sectionData }) {
    //log(sectionData, "innData in SectionList");

    const {
        filterActive,
        filterNames,
        setFilterActive
    } = sectionData;

    const onKeyDownHandler = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();

            setFilterActive(event);
        }
    };

    const filtersArr = filterNames.map(filter => {
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
                onClick={ setFilterActive }
                onKeyDown={ onKeyDownHandler }
                key={v4()}
            >
                { filter }
            </li>
        );
    });



    return (
        <ul
            className="sectionList"
            role="menu"
        >
            {
                filtersArr
            }
        </ul>
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