import alertConstants from "../constants";

/**
 * @param {string[]} payload: possibly multiple text messages to the loading alert
 * @returns {{payload: Array, type: string}}
 */
export const setAlertLoading = (...payload) => ({
    type: alertConstants.ALERT_LOADING,
    payload
});

/**
 * @param {string[]} payload: possibly multiple text messages to the error alert
 * @returns {{payload: Array, type: string}}
 */
export const setAlertError = (...payload) => ({
    type: alertConstants.ALERT_ERROR,
    payload
});

/**
 * @returns {{type: string}}
 */
export const setAlertClear = () => ({
    type: alertConstants.ALERT_CLEAR,
});