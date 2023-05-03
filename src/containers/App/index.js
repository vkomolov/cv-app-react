import React, { useState, useEffect, useRef } from "react";
import "./App.scss";
import ScrollingText from "../ScrollingText";
import AsideBar from "../AsideBar";
import ContentBar from "../ContentBar";
import AlertBlock from "../../components/AlertBlock";

import { getAndRenderData, handleData, getAndStore } from "../../utils/services/userService";

const jsonUrl = "./asset/pData/cv.json";
const scrollingText = "To realize the CV App with React, dynamically constructing " +
    "the Components from the fetched JSON file, which then to be temporally stored in the localStorage for 24 hours. " +
    "To make git branches of the realisations: using state drilling, using stateless functions on hooks and " +
    "using Redux and Router, which will be merged as the final version. "
    + "The link to the code is available in the section \"Experience\"... ";

const alertStateDefault = {
    alertType: null,
    alertContent: []
};

export default function App() {
    const [dataFilters, setDataFilters] = useState([]);
    const [alertState, setAlertState] = useState({
        alertType: "loading",       //    could be "loading", "error" or "null"
        alertContent: ["loading"]   //    the array of strings
    });
    const dataObj = useRef({});
    const innData = dataObj.current;

    //using componentDidMount Effect for one initial update of the states
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

    if (Object.keys(innData).length && dataFilters.length) {
        const filterActive = getFilterActive(dataFilters);
        const filterNames = getFilterNames(dataFilters);
        dataActive = getDataActive(innData, filterActive);
        fullName = innData.fullName;
        photoUrl = innData.photoUrl;

        asideData = {
            data: dataActive("aside"),
            fullName,
            photoUrl,
            filterActive,
            filterNames,
            setDataFilters,
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
                { isNotError && asideData && <AsideBar {...{ asideData }} /> }
                { isNotError && contentData && <ContentBar {...{ contentData }} /> }
            </div>
        </>
    );
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}