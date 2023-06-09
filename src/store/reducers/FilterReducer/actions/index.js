import filterConstants from "../constants";

/**
 * @param {Object} data:
 * @param {Object[]} data.filters: the array of objects (Filters with properties: {string} filterName and {boolean} isActive)
 * @param {Object} data.auxData: fetched or taken from the localStorage
 * @returns {{payload: Object, type: string}}
 */
export const setDataFilters = data => ({
    type: filterConstants.SET_DATA_FILTERS,
    payload: data
});

/**
 * @param {string} filterName: the property of the {Object} filter
 * @returns {{payload: string, type: string}}
 */
export const setFilterActive = filterName => ({
    type: filterConstants.SET_FILTER_ACTIVE,
    payload: filterName
});