import React from "react";
import "./AsideContent.scss";
import AsideSegment from "../AsideSegment";
import { v4 } from "uuid";
import { useAsideData } from "../../providers/AsideDataProvider";

export default function AsideContent() {
    const asideData = useAsideData();
    const { data } = asideData;

    /** to filter from possible not array data... **/
     const keysArr = Object.keys(data).filter(key => Array.isArray(data[key]));
     const asideSegments = keysArr.map(prop => (
         <AsideSegment
             data={ data[prop] }
             key={ v4() }
         />
     ));

    return (
        <div className="segment-block-wrapper">
            { asideSegments }
        </div>
    );
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}