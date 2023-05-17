import alertConstants from "./constants";

const alertStateDefault = {
    alertType: null,
    alertContent: []
};

const initialAlert = {
    alertType: "loading",       //    could be "loading", "error" or "null"
    alertContent: ["loading"]   //    the array of strings
};

const alertReducer = (initialState = initialAlert, { type, payload }) => {
    const alertState = { ...initialState };
    const loadingAndErrorHandle = () => {
        if (alertState.alertType === type) {
            return {
                ...alertState,
                alertContent: alertState.alertContent.concat(payload)
            };
        }
        return {
            alertType: type,
            alertContent: [
                ...payload
            ]
        }
    };

    const typesObj = {
        [alertConstants.ALERT_CLEAR]: () => ({
            ...alertStateDefault
        }),
        [alertConstants.ALERT_LOADING]: () => loadingAndErrorHandle(),
        [alertConstants.ALERT_ERROR]: () => loadingAndErrorHandle(),
    };

    return (type in typesObj) ? typesObj[type]() : alertState;

};

export default alertReducer;