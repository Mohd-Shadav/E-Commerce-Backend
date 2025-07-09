import {configureStore} from '@reduxjs/toolkit'
import {adminDataGetter, loggedInSlice,themeMode} from "./slice";

export const store  =  configureStore({
    reducer:{
        loggedInStatus : loggedInSlice,
        themeStatus : themeMode,
        getAdminData:adminDataGetter
    }
})

