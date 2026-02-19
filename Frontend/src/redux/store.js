import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./slices/propertySlice"
import authReducer from "./slices/authSlice";
import wishlistReducer from "./slices/wishlistSlice";
export const store=configureStore({
    reducer:{
        properties:propertyReducer,
        auth:authReducer,
       wishlist:wishlistReducer,
        
    },
     devTools: true,
})