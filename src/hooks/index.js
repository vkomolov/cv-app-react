import { useReducer, useCallback, useEffect, useRef } from "react";
import { getAndStore } from "../utils/services/userService";
import filterReducer from "../reducers/FilterReducer";
import alertReducer from "../reducers/AlertReducer";
import { setAlertLoading, setAlertError, setAlertClear } from "../reducers/AlertReducer/actions";
import { setDataFilters, setFilterActive } from "../reducers/FilterReducer/actions";

const initialAlert = {
    alertType: "loading",       //    could be "loading", "error" or "null"
    alertContent: ["loading"]   //    the array of strings
};

const cbHandleData = (data) => {
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
};
const fetchData = async ({
                             path,
                             timeLimit,
                             extension,
                             isCanceled,
                             imitateDelay,
                             dataRef,
                             handleData,
                             setFilters,
                             dispatchLoading,
                             dispatchError,
                             dispatchAlertClear
                         }) => {
    try {
        dispatchLoading("Loading data...");
        let data = await getAndStore(path, timeLimit, extension);
        if (isCanceled.current) return;

        // loading photoUrl, if exists...
        if (data["photoUrl"]) {
            const objUrl = await getAndStore(data["photoUrl"], 1, "blob");
            if (isCanceled.current) return;

            data = {
                ...data,
                photoUrl: objUrl,
            };
        }

        // delay for loading imitation
        await new Promise(resolve => setTimeout(resolve, imitateDelay));
        if (isCanceled.current) return;

        dataRef.current = data;
        const filterArr = handleData(data);
        setFilters(filterArr);
        dispatchAlertClear();
    }
    catch (e) {
        if (isCanceled.current) return;
        console.error(e.message);
        dispatchError(e.message);
    }
};

/**
 * @description it gets the data fetched or taken from localStorage, then creates the states for the filters and
 * alerts, then returns the fetched data, states and the setters of the states...
 * @param {string} path : url to data to be fetched
 * @param {string} extension : optional type of the data received from http request
 * @param {number} imitateDelay : optional for imitating delays in fetching process
 * @param {number} timeLimit : time limits for storing in localStorage (days)
 * @return {null | Object}
 */
export function useInitData(path, extension="json", imitateDelay=1000, timeLimit=1) {
    const [dataFilters, filterAction] = useReducer(filterReducer, [], undefined);
    const [alertState, alertAction] = useReducer(alertReducer, initialAlert, undefined);
    const dataRef = useRef(null);

    const dispatchLoading = useCallback(message => {
        alertAction(setAlertLoading(message));
    }, []);
    const dispatchError = useCallback(message => {
        alertAction(setAlertError(message));
    }, []);
    const dispatchAlertClear = useCallback(() => {
        alertAction(setAlertClear());
    }, []);

    /**
     * it makes the array of the filters from the given data
     * @param { Object } data
     * @returns {Object[]} array of filters with properties: 'filterName', "isActive'
     */
    const handleData = useCallback(cbHandleData, []);
    const activateFilter = useCallback(filter => {
        filterAction(setFilterActive(filter));
    }, []);
    const setFilters = useCallback(filters => {
        filterAction(setDataFilters(filters));
    }, []);

    useEffect(() => {
        const isCanceled = { current: false };

        const params = {
            path,
            timeLimit,
            extension,
            isCanceled,
            imitateDelay,
            dataRef,
            handleData,
            setFilters,
            dispatchLoading,
            dispatchError,
            dispatchAlertClear
        };

        fetchData(params);


        return () => { isCanceled.current = true; };
    }, [path, extension, imitateDelay, timeLimit, dispatchLoading, dispatchAlertClear, dispatchError, handleData, setFilters]);

    const filtersData = {
        dataFilters,
        filterActions: {
            activateFilter
        }
    };

    return {
        innData: dataRef.current,
        alertState,
        filtersData
    };
}


