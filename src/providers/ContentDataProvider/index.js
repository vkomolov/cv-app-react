import React, { createContext, useContext } from "react";
//import * as PropTypes from "prop-types";

const ContentDataContext = createContext(null);
export const useContentData = () => useContext(ContentDataContext);

/*eslint react/prop-types:0*/
export default function ContentDataProvider({ data, children }) {
    log(typeof children, "typeof children");

    return (
        <ContentDataContext.Provider value={ data } >
            { children }
        </ContentDataContext.Provider>
    );
}

/*
ContentDataProvider.propTypes = {
    data: PropTypes.object,
    children: PropTypes.ReactNode

}*/



///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}