import { useCallback, useEffect, useRef } from "react";
import { getAndStore } from "../utils/services/userService";
import { setAlertLoading, setAlertError, setAlertClear } from "../store/reducers/AlertReducer/actions";
import { setDataFilters, setFilterActive } from "../store/reducers/FilterReducer/actions";
import { useSelector, useDispatch } from "react-redux";

const handleData = (data) => {
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
                         }) => {
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

    return data;
};

/**
 * @description it gets the data fetched or taken from localStorage, then gets the states for the filters and
 * alerts, then returns the fetched data, states and the action makers for the states...
 * @param {string} path : url to data to be fetched
 * @param {string} extension : optional type of the data received from http request
 * @param {number} imitateDelay : optional for imitating delays in fetching process
 * @param {number} timeLimit : time limits for storing in localStorage (days)
 * @return {null | Object}
 */

export function useInnData(path, extension="json", imitateDelay=1000, timeLimit=1) {
    const alertState = useSelector(state => state.alertState);
    const filterState = useSelector(state => state.filterState);
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
    const activateFilter = useCallback(filterChosen => {
        dispatch(setFilterActive(filterChosen));
    }, [dispatch]);
    const setFilters = useCallback(filterArr => {
        dispatch(setDataFilters(filterArr));
    }, [dispatch]);

    useEffect(() => {
        const isCanceled = { current: false };

        const params = {
            path,
            timeLimit,
            extension,
            isCanceled,
            imitateDelay
        };

        dispatchLoading("Loading data...");

        fetchData(params)
            .then(data => {
                if (data) {
                    dataRef.current = data;
                    const filterArr = handleData(data);
                    setFilters(filterArr);
                    dispatchAlertClear();
                }
            })
            .catch (e => {
            console.error(e.message);
            dispatchError(e.message);
            });

        return () => { isCanceled.current = true; };
    }, [path, extension, imitateDelay, timeLimit, dispatchLoading, dispatchAlertClear, dispatchError, setFilters]);

    const alertData = {
        alertState,
        alertActions: {
            dispatchLoading,
            dispatchError,
            dispatchAlertClear
        },
    };
    const filtersData = {
        filterState,
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
