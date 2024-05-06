import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import foodsReducer from "./foodsSlice"

const store =  configureStore({
    reducer:{
        user: userReducer,
        foods: foodsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;