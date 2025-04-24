import alertConstants from "./constants";

const alertStateDefault = {
    alertType: null,
    alertContent: []
};

const alertReducer = (initialState = alertStateDefault, { type, payload }) => {
    switch (type) {
        case alertConstants.ALERT_CLEAR: {
            return {
                ...alertStateDefault
            }
        }
        case alertConstants.ALERT_LOADING:
        case alertConstants.ALERT_ERROR:
            return {
                alertType: type,
                alertContent: Array.isArray(payload) ? [...payload] : [payload]
            };
        default:
            return initialState;
    }
};

export default alertReducer;