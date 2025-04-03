import {configureStore} from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/authSlices.js";
import productSliceReducer from "./Slices/productSlices.js";
import appointmentSliceReducer from "./Slices/appointmentSlices.js";
import cartSliceReducer from "./Slices/cartSlices.js";
import orderSliceReducer from "./Slices/orderSlices.js";

const store = configureStore({
    reducer : {
        auth : authSliceReducer,
        productsList : productSliceReducer,
        appointments : appointmentSliceReducer,
        cart : cartSliceReducer,
        orders : orderSliceReducer
    },
    devTools : true
});

export default store;