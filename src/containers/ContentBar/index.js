import React from "react";
import * as PropTypes from "prop-types";

import "./ContentBar.scss";

export default function ContentBar({ contentData }) {

    log(contentData, "data inside ContentBar");

    return (
        <main className="contentBar">
            Content Bar
        </main>
    );
}

ContentBar.propTypes = {
    contentData: PropTypes.object
};
///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}