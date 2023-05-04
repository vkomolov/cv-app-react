import React, { createContext, useContext } from "react";
//import * as PropTypes from "prop-types";

const AsideDataContext = createContext(null);
export const useAsideData = () => useContext(AsideDataContext);

/*eslint react/prop-types:0*/
export default function AsideDataProvider({ data, children }) {
    log(typeof children, "typeof children");

    return (
        <AsideDataContext.Provider value={ data } >
            { children }
        </AsideDataContext.Provider>
    );
}

/*
AsideDataProvider.propTypes = {
    data: PropTypes.object,
    children: PropTypes.ReactNode

}*/



///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}
