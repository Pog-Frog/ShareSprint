import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

export interface AuthState {
    token: string | null;
    email: string | null;
}

const initialState = {
    token: null,
    email: null,
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
        },
        setEmail: (state, action) => {
            state.email = action.payload;
            localStorage.setItem("email", action.payload);
        },
        deleteEmail: (state) => {
            state.email = null;
            localStorage.removeItem("email");
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
export const {setEmail} = AuthSlice.actions;
export const {deleteEmail} = AuthSlice.actions;
export const selectAuthState = (state: any) => state.auth.token;
export default AuthSlice.reducer;
