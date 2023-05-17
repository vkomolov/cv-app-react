import React, { useEffect, useRef } from "react";
import "./ContentBar.scss";
import ContentItem from "../ContentItem";
import reactIcon from "../../asset/img/reactIcon.png";
import ImageWrapper from "../../components/ImageWrapper";
import { v4 } from "uuid";
import { providerContext } from "../../DataProvider";

export default function ContentBar() {
    const { contentData } = providerContext;
    const contentBarRef = useRef(null);
    const { filterActive, data } = contentData();
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

    //appearance of the Component with transition
    useEffect(() => {
        const { current } = contentBarRef;
        current.classList.toggle("fade-in");

        setTimeout(() => {
            current.classList.toggle("fade-in");
        }, 200);
    });

    return (
        <main
            className="contentBar fade-in"
            ref={ contentBarRef }
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

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}