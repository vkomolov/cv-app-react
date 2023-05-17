import React, { createContext, useContext } from "react";
import * as PropTypes from "prop-types";

export const providerContext = {};

export default function DataProvider({ name, data, children }) {
    const DataContext = createContext(null);
    const useDataContext = () => useContext(DataContext);

    Object.assign(providerContext, {
        [name]: useDataContext
    });

    return (
        <DataContext.Provider value={ data } >
            { children }
        </DataContext.Provider>
    );
}

DataProvider.propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.object,
    children: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array
        ]
    )
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}