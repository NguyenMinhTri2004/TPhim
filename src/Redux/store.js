import {configureStore} from "@reduxjs/toolkit"
import  authSlice  from './Auth/authSlide'
import favoriteSlice from "./Favorite/favoriteSlice"
export const store = configureStore({

    reducer : {
       
        auth :  authSlice ,
        favoriteSlice : favoriteSlice

    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck : false
    }),

})