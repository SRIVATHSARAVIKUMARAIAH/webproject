import { configureStore} from "@reduxjs/toolkit";
import AuthSlice from "../features/auth/AuthSlice";
import CartSlice from "../features/cart/CartSlice";


export const store=configureStore({
    reducer:{
        AuthSlice,
        CartSlice
    }
})
