import { createSlice } from "@reduxjs/toolkit";

const alertStateDefault = {
    alertType: null,
    alertContent: []
};

const alertSlice = createSlice({
    name: "alertReducer",
    initialState: alertStateDefault,
    reducers: {
        alertClear: state => {
            state.alertType = alertStateDefault.alertType;
            state.alertContent = alertStateDefault.alertContent;
        },
        alertLoading: (state, action) => {
            state.alertType = "loading";
            state.alertContent.push(action.payload);
        },
        alertError: (state, action) => {
            state.alertType = "error";
            state.alertContent.push(action.payload)
        }
    }
});

export const { alertClear, alertError, alertLoading } = alertSlice.actions;
export default alertSlice.reducer;