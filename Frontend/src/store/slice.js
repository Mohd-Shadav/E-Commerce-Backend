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


const adminDataSlice = createSlice({
    name:"admin",
    initialState:{
        adminName:"",
        adminPic:""
    },
    reducers:{
        getAdminData : (state,action)=>{
           
            state.adminName = action.payload.adminName;
            state.adminPic = action.payload.adminPic;
            
        }
      

    }
})
export const {login,logout} = isLoggedInSlice.actions;
export const {light,dark} = themeSlice.actions;
export const {getAdminData} = adminDataSlice.actions;
export const loggedInSlice =  isLoggedInSlice.reducer;
export const themeMode = themeSlice.reducer;
export const adminDataGetter = adminDataSlice.reducer;