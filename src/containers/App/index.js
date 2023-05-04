import React, { useState, useEffect, useRef, useMemo, useCallback, createContext } from "react";
import "./App.scss";
import ScrollingText from "../ScrollingText";
import AsideBar from "../AsideBar";
import ContentBar from "../ContentBar";
import AlertBlock from "../../components/AlertBlock";

import { getAndRenderData, handleData, getAndStore } from "../../utils/services/userService";

const jsonUrl = "./asset/pData/cv.json";
const scrollingText = "To realize the CV App with React, dynamically constructing " +
    "the Components from the fetched JSON file, which then to be temporally stored in the localStorage for 24 hours. " +
    "To make git branches with the realisations: using state and props drilling, using stateless functions on hooks and " +
    "using Redux and Router, which will be merged as the final version. "
    + "The link to the code is available in the section \"Experience\"... ";

const alertStateDefault = {
    alertType: null,
    alertContent: []
};

/**
 * The contexts were made just for demonstration of its usage: in this case of app, no need for context creations,
 * because each child component is in need for a part of the data passed in props and further they pass the rest of
 * the data deeper in the tree of the children...
 * @type {React.Context<null>}
 */
export const AsideContext = createContext(null);
export const ContentContext = createContext(null);

export default function App() {
    const [dataFilters, setDataFilters] = useState([]);
    const [alertState, setAlertState] = useState({
        alertType: "loading",       //    could be "loading", "error" or "null"
        alertContent: ["loading"]   //    the array of strings
    });
    const dataObj = useRef({});
    const innData = dataObj.current;

    //using componentDidMount Effect for one initial update of the state
    useEffect(() => {
        getAndRenderData(jsonUrl, getAndStore)
            .then(auxData => {
                const filterArr = handleData(auxData);

                setTimeout(() => {
                    dataObj.current = Object.assign(dataObj.current, auxData);

                    setDataFilters([...filterArr]);
                    alertClear();
                }, 1000);
            })
            .catch(e => {
            console.error(e.message, "catching error:");
            //if alertType is already "error" and added new error content, then to concat the content

            dispatchAlert("error", e.message);
        })
    /*eslint react-hooks/exhaustive-deps:0*/
    //for only componentDidMount effect
    }, []);

    let dataActive, fullName, photoUrl, asideData, contentData;
    const isNotError = alertState.alertType !== "error";
    const scrollingTextData = {
        text: scrollingText,
        duration: 50000,
        isFinite: true,
    };

    /**
     * useMemo just for demonstration of the hook: in other cases it`s used for performance optimizations
     * of heavy calculations
     */
    const filterActive = useMemo(() => getFilterActive(dataFilters), [dataFilters]);
    const filterNames = useMemo(() => getFilterNames(dataFilters), [dataFilters]);

    /**
     * avoiding re-rendering of setFilterActive callBack in consuming child components
     * in this case we could pass just setDataFilters as a callBack without useCallback hook
     */
    const setFilterActive = useCallback((filterChosen) => {
        return setDataFilters(prevDataFilters => {
            return prevDataFilters.map(filter => {
                const isActive = filter.filterName === filterChosen;
                return {
                    ...filter,
                    isActive
                };
            });
        });
    }, []); //no need for dependencies

    if (Object.keys(innData).length && dataFilters.length) {
        dataActive = getDataActive(innData, filterActive);
        fullName = innData.fullName;
        photoUrl = innData.photoUrl;

        asideData = {
            data: dataActive("aside"),
            fullName,
            photoUrl,
            filterActive,
            filterNames,
            setFilterActive,
        };
        contentData = {
            data: dataActive("content"),
            filterActive
        }
    }

    function dispatchAlert(type, ...content) {
        const alertContent = alertState.alertType === type
            ? alertState.alertContent.concat(...content)
            : [...content];

        setAlertState({
            alertType: type,
            alertContent
        });
    }

    function alertClear() {
        setAlertState({ ...alertStateDefault });
    }

    /**
     * @param {Object[]} dataFilters
     * @returns {null|string}
     */
    function getFilterActive(dataFilters) {
        if (!dataFilters.length) {
            return null;
        }
        return dataFilters.find(filter => !!filter.isActive).filterName;
    }

    /**
     *
     * @param {Object} data
     * @param {string} filterActive
     * @returns {null|Function}
     */
    function getDataActive(data, filterActive) {
        if (!Object.keys(data).length) {
            return null;
        }

        const dataFiltered = data[filterActive];
        return (prop) => {
            if (prop in dataFiltered) {
                return dataFiltered[prop];
            }
            console.error(`property ${ prop } is not found at App.js: getDataActive`);
            return null;
        };
    }

    /**
     *
     * @param {Object[]} dataFilters
     * @returns {null|Array}
     */
    function getFilterNames(dataFilters) {
        if (!dataFilters.length) {
            return null;
        }
        return dataFilters.map(filter => filter.filterName);
    }

    return (
        <>
            {
                isNotError
                && Object.keys(innData).length
                && <ScrollingText data={ scrollingTextData } />
            }
            <div className="totalWrapper">
                { alertState.alertType && <AlertBlock { ...{ alertState } } /> }
                <AsideContext.Provider value={ asideData } >
                    { isNotError && asideData && <AsideBar /> }
                </AsideContext.Provider>
                <ContentContext.Provider value={ contentData } >
                    { isNotError && contentData && <ContentBar /> }
                </ContentContext.Provider>
            </div>
        </>
    );
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}