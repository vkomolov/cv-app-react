import { useCallback, useEffect, useRef, useState } from "react";
import * as PropTypes from "prop-types";
import { getAndStore } from "../utils/services/userService";

const initialAlert = {
    alertType: "loading",       //    could be "loading", "error" or "null"
    alertContent: ["loading"]   //    the array of strings
};
const alertStateDefault = {
    alertType: null,
    alertContent: []
};

/**
 * @description it gets the data fetched or taken from localStorage, then creates the states for the filters and
 * alerts, then returns the fetched data, states and the setters of the states...
 * @param {string} path: url to data to be fetched
 * @param {string} extension: optional type of the data received from http request
 * @param {number} imitateDelay: optional for imitating delays in fetching process
 * @param {number} timeLimit: time limits for storing in localStorage (days)
 * @return {null | Object}
 */
export function useInitData(path, extension="json", imitateDelay=1000, timeLimit=1) {
    const [dataFilters, setDataFilters] = useState([]);
    const [alertState, setAlertState] = useState(initialAlert);
    const dataRef = useRef(null);

    /**
     * @param {string} type: "error", or "loading"
     * @param {Array} content: is the array of text elems, which will be shown in the AlertBlock
     */
    const dispatchAlert = useCallback((type, ...content) => {
        const alertContent = alertState.alertType === type
            ? alertState.alertContent.concat(...content)
            : [...content];

        setAlertState({
            alertType: type,
            alertContent
        });
        //disabling dependencies with 'type' and dynamic array 'content'
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    /**
     * it resets the alert state to default params
     */
    const alertClear = useCallback(() => {
        setAlertState({ ...alertStateDefault });
    }, []);

    /**
     * it makes the array of the filters from the given data
     * @param { Object } data
     * @returns {Object[]} array of filters with properties: 'filterName', "isActive'
     */
    const handleData = useCallback(data => {
        if (Object.keys(data).length) {
            const filterArr = Object.keys(data).reduce((acc, key) => {
                if (key !== "fullName" && key !== "photoUrl") {
                    const isActive = acc.length === 0;
                    return acc.concat({
                        filterName: key,
                        isActive,
                    });
                }
                return acc;
            }, []);

            if (!filterArr.length) {
                throw new Error("no filters found in given data...");
            }

            return filterArr;
        }
        else {
            throw new Error("no correct data received...");
        }
    }, []);

    /**
     * it changes the state of dataFilters, by changing the bool of the property 'isActive'
     * @param {string} filterChosen
     */
    const setFilterActive = useCallback(filterChosen => {
        return setDataFilters(prevDataFilters => {
            return prevDataFilters.map(filter => {
                const isActive = filter.filterName === filterChosen;
                return {
                    ...filter,
                    isActive
                };
            });
        });
    }, []);

    useEffect(() => {
        let isCanceled = false;
        const cleanup = () => {
            isCanceled = true;
            return undefined;
        };

        getAndStore(path, timeLimit, extension)
            .then(data => {
                if (isCanceled) return;
                /**
                 * on fetching the data it takes data['photoUrl'] which is {string} and additionally fetches
                 * the blob from this url, then reading by File-Reader it re-sets the value of data['photoUrl'] and
                 * finally returns the updated data
                 */
                if (data["photoUrl"]) {
                    return getAndStore(data["photoUrl"], 1, "blob")
                        .then(objUrl => {
                            if (isCanceled) return;

                            return {
                                ...data,
                                photoUrl: objUrl,
                            };
                        });
                }
                return data;
            })
            .then(data => {
                if (isCanceled) return;

                setTimeout(() => {
                    dataRef.current = data;
                    const filterArr = handleData(data);
                    setDataFilters([...filterArr]);
                    alertClear();
                }, imitateDelay);
            })
            .catch(e => {
                if (isCanceled) return;

                console.error(e.message);
                dispatchAlert("error", e.message)
            });

        return cleanup;
    }, [path, extension, imitateDelay, timeLimit, alertClear, dispatchAlert, handleData]);

    const alertData = {
        alertState,
        alertSetters: [dispatchAlert, alertClear],
    };
    const filtersData = {
        dataFilters,
        filterSetters: [setFilterActive]
    };

    return {
        innData: dataRef.current,
        alertData,
        filtersData
    };
}
useInitData.propTypes = {
    path: PropTypes.string.isRequired,
    extension: PropTypes.string,
    imitateDelay: PropTypes.number,
    timeLimit: PropTypes.number
};


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}