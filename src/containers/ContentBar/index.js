import React, { Component, createRef } from "react";
import * as PropTypes from "prop-types";

import "./ContentBar.scss";
import ContentItem from "../ContentItem";
import { v4 } from "uuid";

/**
 * @param { Object } contentData
 * @constructor
 */
export default class ContentBar extends Component {
    constructor(props) {
        super(props);

        this.ref = createRef();
    }

    render() {
        const { contentData } = this.props;
        const { filterActive, data } = contentData;
        /**
         * avoiding additional state, this.filterActiveCurrent is used for componentDidUpdate
         * in order to check if filterActive has changed. If true then to set animation fadeIn
         */
        this.filterActiveCurrent = filterActive;
        const { title, details } = data;
        const specClassName = filterActive === "personal" ? "personal-spec" : null;
        const contentArr = details.map(data => {
            const classAux = specClassName && ("contentWrapper" + " " + specClassName) || "contentWrapper";

            return <ContentItem
                { ...{ data } }
                classAux={ classAux }
                key={ v4() }
            />
        });

        return (
            <main
                className="contentBar fade-in"
                ref={ this.ref }
            >
                <h2 className="heading" >
                    { title }
                </h2>
                { contentArr }
            </main>
        );
    }

    /**
     * @param { Object } contentData from 'prevProps'
     */
    componentDidUpdate({ contentData }) {
        const contentBarHtml = this.ref.current;
        const prevFilterActive = contentData.filterActive;
        if (this.filterActiveCurrent !== prevFilterActive) {
            contentBarHtml.classList.toggle("fade-in");

            setTimeout(() => {
                contentBarHtml.classList.toggle("fade-in");
            }, 200);
        }
    }
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