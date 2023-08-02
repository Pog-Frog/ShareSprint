import thunk from 'redux-thunk';
import {AuthSlice} from './reducers/auth.reducer';
import {ErrorSlice} from './reducers/error.reducer';
import {configureStore, ThunkAction, Action, combineReducers} from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {SuccessSlice} from "@/redux/reducers/success.reducer";

const rootReducer = combineReducers({
    [AuthSlice.name]: AuthSlice.reducer,
    [ErrorSlice.name]: ErrorSlice.reducer,
    [SuccessSlice.name]: SuccessSlice.reducer,
});

const makeConfiguredStore = () =>
    configureStore({
        reducer: rootReducer,
        devTools: true,
    });

export const makeStore = () => {
    const isServer = typeof window === "undefined";
    if (isServer) {
        return makeConfiguredStore();
    } else {
        const persistConfig = {
            key: "root",
            whitelist: ["auth", "error", "success"],
            storage,
        };
        const persistedReducer = persistReducer(persistConfig, rootReducer);
        let store: any = configureStore({
            reducer: persistedReducer,
            devTools: process.env.NODE_ENV !== "production",
            middleware: [thunk],
        });
        store.__persistor = persistStore(store);
        return store;
    }
};

export const wrapper = createWrapper<AppStore>(makeStore);
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
>;
