import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

export interface AuthState {
    token: string | null;
}

const initialState = {
    token: null,
};

export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
        },
        deleteToken: (state) => {
            state.token = null;
            localStorage.removeItem("token");
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.auth,
            };
        }
    }
});

export const {setToken} = AuthSlice.actions;
export const {deleteToken} = AuthSlice.actions;
export const selectAuthState = (state: any) => state.auth.token;
export default AuthSlice.reducer;
