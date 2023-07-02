import { useCallback, useMemo, useRef, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAlertLoading, setAlertError, setAlertClear } from "../store/reducers/AlertReducer/actions";
import { initOpacityAnimation, prepareData } from "../api";
import { useParams } from "react-router-dom";

/**
 * Custom Hook which returns the state of the alert in redux reducer and the following actions
 * @returns {{initAlertClear: *, initAlertError: *, alertState: {Object}, initAlertLoading: *}}
 */
export function useAlertData() {
    const dispatch = useDispatch();
    const alertState = useSelector(state => state.alertState);
    const initAlertLoading = useCallback((...textContent) => {
        dispatch(setAlertLoading(...textContent));
    }, [dispatch]);
    const initAlertError = useCallback((...textContent) => {
        dispatch(setAlertError(...textContent));
    }, [dispatch]);
    const initAlertClear = useCallback(() => {
        dispatch(setAlertClear());
    }, [dispatch]);


    return {
        alertState,
        initAlertLoading,
        initAlertError,
        initAlertClear
    };
}

/**
 * Custom Hook which takes the property from "/:filter" and prepares the data for AsideBar and ContentBar Components...
 * @returns {{innData: *}}
 */
export function useInnData() {
    const { filter } = useParams();
    const dataState = useSelector(state => state.dataState);
    const { auxData } = dataState;

    //memoized data avoiding state changes except filtersState...
    const innData = useMemo(() => prepareData(auxData, filter),
        [auxData, filter]
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