import alertConstants from "./constants";

const alertStateDefault = {
    alertType: null,
    alertContent: []
};

/*const alertInitial = {
    alertType: "loading",
    alertContent: ["loading"]
};*/

const alertReducer = (initialState = alertStateDefault, { type, payload }) => {
    const loadingAndErrorHandle = () => {
        if (initialState.alertType === type) {
            return {
                ...initialState,
                alertContent: initialState.alertContent.concat(payload)
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

    return (type in typesObj) ? typesObj[type]() : initialState;

};

export default alertReducer;