import {configureStore} from '@reduxjs/toolkit'
import {loggedInSlice,themeMode} from "./slice";

export const store  =  configureStore({
    reducer:{
        loggedInStatus : loggedInSlice,
        themeStatus : themeMode
    }
})

