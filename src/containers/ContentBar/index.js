import React from "react";
import "./ContentBar.scss";
import ContentItem from "../ContentItem";
import reactIcon from "../../asset/img/reactIcon.png";
import ImageWrapper from "../../components/ImageWrapper";
import { useOpacityTransition } from "../../hooks";
import { v4 } from "uuid";
import * as PropTypes from "prop-types";

export default function ContentBar({ withData }) {
    const transitionedRef = useOpacityTransition(700);
    const { filterActive, data } = withData;
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
            className="contentBar"
            ref={ transitionedRef }
        >
            <ImageWrapper
                alt="React icon"
                imgSrc={ reactIcon }
                className="reactIconWrapper"
            />
            <h2 className="heading" >
                { title }
            </h2>
            { contentArr }
        </main>
    );
}

ContentBar.propTypes = {
    withData: PropTypes.shape({
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