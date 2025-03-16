import {configureStore} from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/authSlices.js";
import productSliceReducer from "./Slices/productSlices.js";
import appointmentSliceReducer from "./Slices/appointmentSlices.js";

const store = configureStore({
    reducer : {
        auth : authSliceReducer,
        productsList : productSliceReducer,
        appointments : appointmentSliceReducer,
    },
    devTools : true
});

export default store;