import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilterActive } from "../store/reducers/FilterReducer/actions";

export function useInnData() {
    const dispatch = useDispatch(); //constant ref to function for use in useCallBack dependencies (ESLint requires)
    const alertState = useSelector(state => state.alertState);
    const filtersState = useSelector(state => state.filterState);
    const { auxData, filters } = filtersState;

    const activateFilter = useCallback(filterName => {
        dispatch(setFilterActive(filterName));
    }, [dispatch]);

    //memoized data avoiding state changes except filtersState...
    const innData = useMemo(() => prepareData(auxData, filters, activateFilter),
        [auxData, filters, activateFilter]
    );

    return {
        innData,
        alertState
    };
}

function prepareData(auxData, filters, activateFilter) {
    if (!auxData) {
        return null;
    }

    const filterActive = getFilterActive(filters);
    const filterNames = getFilterNames(filters);
    const getDataActive = getFuncDataActive(auxData, filterActive);

    const fullName = auxData.fullName;
    const photoUrl = auxData.photoUrl;
    const asideData = {
        data: getDataActive("aside"),
        fullName,
        photoUrl,
        filterActive,
        filterNames,
        activateFilter,
    };
    const contentData = {
        data: getDataActive("content"),
        filterActive
    };

    return {
        asideData,
        contentData
    };


    /** It returns the active filter name
     * @param {Object[]} filters: the array of filters
     * @returns {null|string}
     */
    function getFilterActive(filters) {
        if (!filters.length) {
            return null;
        }
        return filters.find(filter => !!filter.isActive).filterName;
    }

    /**
     * @param {Object} data
     * @param {string} filterActive: the name of the active filter
     * @returns {null|Function}
     */
    function getFuncDataActive(data, filterActive) {
        if (!Object.keys(data).length) {
            return null;
        }

        const dataFiltered = data[filterActive];
        return (prop) => {
            if (prop in dataFiltered) {
                return dataFiltered[prop];
            }
            console.error(`property ${ prop } is not found in given data at hooks/index.js: prepareData: getFuncDataActive`);
            return null;
        };
    }

    /**It returns the array of the filters` names
     * @param {Object[]} dataFilters
     * @returns {null|Array}
     */
    function getFilterNames(dataFilters) {
        if (!dataFilters.length) {
            return null;
        }
        return dataFilters.map(filter => filter.filterName);
    }
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}