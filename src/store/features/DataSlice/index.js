import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auxData: null,
};

const dataSlice = createSlice({
    name: "dataReducer",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.auxData = action.payload;
        }
    }
});

export const { setData } = dataSlice.actions;
export default dataSlice.reducer;