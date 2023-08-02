import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { HYDRATE } from "next-redux-wrapper";

export interface SuccessState {
    successMsg: string | null;
}

const initialState = {
    successMsg: null,
}

export const SuccessSlice = createSlice({
    name: "success",
    initialState,
    reducers: {
        showSuccess: (state, action) => {
            state.successMsg = action.payload;
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.success,
            };
        }
    }
});

export const { showSuccess } = SuccessSlice.actions;

export const selectSuccessState = (state: AppState) => state.success.successMsg;

export default SuccessSlice.reducer;