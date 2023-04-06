import React from "react";
import * as PropTypes from "prop-types";

import "./ContentBar.scss";

export default function ContentBar({ data }) {

    log(data, "data inside ContentBar");

    return (
        <div className="contentBar">
            Content Bar
        </div>
    );
}

ContentBar.propTypes = {
    data: PropTypes.object
};
///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}