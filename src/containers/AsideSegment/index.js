import React from "react";
import * as PropTypes from "prop-types";
import "./AsideSegment.scss";
import AsideItem from "../../components/AsideItem";
import { nanoid } from "@reduxjs/toolkit";

export default function AsideSegment({ data }) {
    const asideItems = data.map(dataItem => (
        <AsideItem
            data={ dataItem }
            key={ nanoid() }
        />
    ));

    return (
        <div className="segment-block">
            { asideItems }
        </div>
    );
}

AsideSegment.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}