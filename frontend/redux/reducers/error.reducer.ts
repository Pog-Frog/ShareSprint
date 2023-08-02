import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { HYDRATE } from "next-redux-wrapper";

export interface ErrorState {
    errorMsg: string | null;
}

const initialState = {
    errorMsg: null,
};

export const ErrorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        showError: (state, action) => {
            state.errorMsg = action.payload;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.error,
            };
        }
    }
});

export const { showError } = ErrorSlice.actions;

export const selectErrorState = (state: AppState) => state.error.errorMsg;

export default ErrorSlice.reducer;
