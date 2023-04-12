import React from "react";
import * as PropTypes from "prop-types";

import "./ContentBar.scss";
import ContentItem from "../ContentItem";
import { v4 } from "uuid";

/**
 * //TODO: to change transition on mount
 * @param { Object } contentData
 * @constructor
 */
export default function ContentBar({ contentData }) {

    log(contentData, "data inside ContentBar");

    const { filterActive, data } = contentData;
    const { title, details } = data;


    const specClassName = filterActive === "personal" ? "personal-spec" : null;
    let contentArr = details.map(data => {
        const classAux = specClassName && ("contentWrapper" + " " + specClassName) || "contentWrapper";

        return <ContentItem
            { ...{ data } }
            classAux={ classAux }
            key={ v4() }
        />
    });

    return (
        <main className="contentBar">
            <h2 className="heading">
                { title }
            </h2>
            { contentArr }
        </main>
    );
}

ContentBar.propTypes = {
    contentData: PropTypes.shape({
        filterActive: PropTypes.string.isRequired,
        data: PropTypes.shape({
            title: PropTypes.string.isRequired,
            details: PropTypes.array.isRequired
        }),
    })
};


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}