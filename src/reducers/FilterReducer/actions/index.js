import filterConstants from "../constants";

/**
 * @param {Object[]} data: the array of objects (Filters with properties: {string} filterName and {boolean} isActive)
 * @returns {{payload: Array, type: string}}
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