import filterConstants from "../constants";

/**
 * @param {Object} data: fetched or taken from the localStorage
 * @returns {{payload: Object, type: string}}
 */
export const setData = data => ({
    type: filterConstants.SET_DATA,
    payload: data
});