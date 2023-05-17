import React from "react";
import "./AsideBar.scss";
import ImageSectionContainer from "../ImageSectionContainer";
import AsideContent from "../AsideContent";
import { providerContext } from "../../DataProvider";

export default function AsideBar() {
    const { asideData } = providerContext;
    const { fullName } = asideData();

    return (
        <aside className="asideBar">
            <h1 className="hero-name">
                { fullName }
            </h1>
            <ImageSectionContainer />
            <AsideContent />
        </aside>
    );
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}