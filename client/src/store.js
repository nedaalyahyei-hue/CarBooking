import { configureStore } from "@reduxjs/toolkit";

import UserReducer from './features/UserSlice';
import BookingReducer from './features/BookingSlice';

export const store=configureStore({
    reducer:{
        user:UserReducer,
        booking:BookingReducer
    }
})