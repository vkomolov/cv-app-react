import React from "react";
import * as PropTypes from "prop-types";
import "./AsideSegment.scss";
import AsideItem from "../../components/AsideItem";
import { v4 } from "uuid";

export default function AsideSegment({ data }) {
    log(data, "data inside AsideSegment");

    const asideItems = data.map(dataItem => (
        <AsideItem
            data={ dataItem }
            key={ v4() }
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