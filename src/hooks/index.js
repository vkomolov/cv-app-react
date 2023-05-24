import { useCallback, useEffect, useRef } from "react";
import * as PropTypes from "prop-types";
import { getAndStore } from "../utils/services/userService";
import { setAlertLoading, setAlertError, setAlertClear } from "../store/reducers/AlertReducer/actions";
import { setDataFilters, setFilterActive } from "../store/reducers/FilterReducer/actions";
import { useSelector, useDispatch } from "react-redux";

/**
 * @description it gets the data fetched or taken from localStorage, then gets the states for the filters and
 * alerts, then returns the fetched data, states and the action makers for the states...
 * @param {string} path: url to data to be fetched
 * @param {string} extension: optional type of the data received from http request
 * @param {number} imitateDelay: optional for imitating delays in fetching process
 * @param {number} timeLimit: time limits for storing in localStorage (days)
 * @return {null | Object}
 */

export function useInnData(path, extension="json", imitateDelay=1000, timeLimit=1) {
    const alertState = useSelector(state => state.alertState);
    const dataFilters = useSelector(state => state.filterState);
    const dispatch = useDispatch(); //constant ref to function for use in useCallBack dependencies (ESLint requires)

    const dataRef = useRef(null);
    const dispatchLoading = useCallback(message => {
        dispatch(setAlertLoading(message));
    }, [dispatch]);
    const dispatchError = useCallback(message => {
        dispatch(setAlertError(message));
    }, [dispatch]);
    const dispatchAlertClear = useCallback(() => {
        dispatch(setAlertClear());
    }, [dispatch]);
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
    const activateFilter = useCallback(filterChosen => {
        dispatch(setFilterActive(filterChosen));
    }, [dispatch]);
    const setFilters = useCallback(filterArr => {
        dispatch(setDataFilters(filterArr));
    }, [dispatch]);

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
                    setFilters(filterArr);
                    dispatchAlertClear();
                }, imitateDelay);
            })
            .catch(e => {
                if (isCanceled) return;
                console.error(e.message);
                dispatchError(e.message);
            });

        return cleanup;
    }, [path, extension, imitateDelay, timeLimit, dispatchAlertClear, dispatchError, handleData, setFilters]);

    const alertData = {
        alertState,
        alertActions: {
            dispatchLoading,
            dispatchError,
            dispatchAlertClear
        },
    };
    const filtersData = {
        dataFilters,
        filterActions: {
            activateFilter
        }
    };

    return {
        innData: dataRef.current,
        alertData,
        filtersData
    };
}

useInnData.propTypes = {
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