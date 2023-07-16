import React from "react";
import * as PropTypes from "prop-types";
import "./AsideContent.scss";
import AsideSegment from "../AsideSegment";
import { nanoid } from "@reduxjs/toolkit";


export default function AsideContent({ data }) {
    /** to filter from possible not array data... **/
     const keysArr = Object.keys(data).filter(key => Array.isArray(data[key]));
     const asideSegments = keysArr.map(prop => (
         <AsideSegment
             data={ data[prop] }
             key={ nanoid() }
         />
     ));

    return (
        <div className="segment-block-wrapper">
            { asideSegments }
        </div>
    );
}

AsideContent.propTypes = {
    data: PropTypes.object.isRequired
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}