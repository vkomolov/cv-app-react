import { useCallback, useMemo, useRef, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { alertError, alertClear, alertLoading } from "../store/features/AlertSlice";
import { getFilters, initOpacityAnimation, prepareData } from "../api";
import { useMatch, useParams } from "react-router-dom";

/**
 * Custom Hook which returns the state of the alert in redux reducer and the following actions
 * @returns {{initAlertClear: *, initAlertError: *, alertState: {Object}, initAlertLoading: *}}
 */
export function useAlertData() {
    const dispatch = useDispatch();
    const alertState = useSelector(state => state.alertState);
    const initAlertLoading = useCallback((...textContent) => {
        dispatch(alertLoading(...textContent));
    }, [dispatch]);
    const initAlertError = useCallback((...textContent) => {
        dispatch(alertError(...textContent));
    }, [dispatch]);
    const initAlertClear = useCallback(() => {
        dispatch(alertClear());
    }, [dispatch]);


    return {
        alertState,
        initAlertLoading,
        initAlertError,
        initAlertClear
    };
}

/**
 * @returns {{auxData: Object|null, filter: string|undefined, filters: Array, isRootRoute: Boolean}}
 */
export function useRoutesData() {
    const isRootRoute = useMatch("/");
    const { filter } = useParams();
    const dataState = useSelector(state => state.dataState);
    const { auxData } = dataState;

    return useMemo(() => {
        const filters = getFilters(auxData, ["fullName", "photoUrl"]);

        return {
            auxData,
            filters,
            filter,
            isRootRoute: !!isRootRoute
        }
    }, [ isRootRoute, filter, auxData ]);
}

/**
 *
 * @param {null|Object} auxData
 * @param {Array} filters
 * @param {string|undefined} filter
 * @returns {{innData: Object|null}}
 */
export function useInnData(auxData, filters, filter) {
    //memoized data avoiding state changes except filtersState...
    const innData = useMemo(() => prepareData(auxData, filters, filter),
        [auxData, filters, filter]
    );

    return {
        innData
    };
}


/**
 * It animates the opacity of the HTMLElement from 0 to 1
 * @param {number} duration of the animation
 * @returns {React.MutableRefObject<null>}
 */
export const useOpacityTransition = (duration = 1000) => {
    const ref = useRef(null);

    //to change styles before display refreshing
    useLayoutEffect(() => {
        const htmlElement = ref.current;
        const cancelOpacityAnimation = initOpacityAnimation(htmlElement, duration);

        return () => cancelOpacityAnimation();
    });

    return ref;
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}