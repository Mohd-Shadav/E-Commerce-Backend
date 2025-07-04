import { createSlice } from "@reduxjs/toolkit";


const isLoggedInSlice = createSlice({
    name:"isLoggedIn",
    initialState : {
        value:false
    },
    reducers:{
        login : (state)=>{
            
          state.value = true  
         
        }
        ,
        logout:(state)=>{
          
            state.value = false
           

        }
    }
})

const themeSlice = createSlice({
    name:"theme",
    initialState:{
        value : false
    },
    reducers:{
        light:(state)=>{
            state.value = false
        },
        dark:(state)=>{
            state.value = true
        }
    }
})

export const {login,logout} = isLoggedInSlice.actions;
export const {light,dark} = themeSlice.actions
export const loggedInSlice =  isLoggedInSlice.reducer;
export const themeMode = themeSlice.reducer;