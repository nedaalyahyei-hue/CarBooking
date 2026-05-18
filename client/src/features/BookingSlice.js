import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState={
   bookings:[],
   message:"",
   isLoading:false,
   isSuccess:false,
   isError:false
}

// save booking
export const saveBooking=createAsyncThunk(
    "booking/saveBooking",
    async(bookingData)=>{
        try{
            const response=await axios.post(
                "http://localhost:3002/saveBooking",
                bookingData
            );

            return response.data.message;
        }
        catch(error){
            console.log("Server Error.."+error)
        }
});

// get bookings by user email
export const getBookings=createAsyncThunk(
    "booking/getBookings",
    async(email)=>{
        try{
            const response=await axios.get(
                `http://localhost:3002/getBookings/${email}`
            );

            return response.data.bookings;
        }
        catch(error){
            console.log("Server Error.."+error)
        }
});

// delete booking
export const delBooking=createAsyncThunk(
    "booking/delBooking",
    async(bookingid)=>{
        try{
            await axios.delete(
                `http://localhost:3002/delBooking/${bookingid}`
            );

            return bookingid;
        }
        catch(error){
            console.log("Server Error.."+error)
        }
});

// update booking
export const updBooking=createAsyncThunk(
    "booking/updBooking",
    async(bookingData)=>{
        try{
            const response=await axios.put(
                "http://localhost:3002/updBooking",
                bookingData
            );

            return response.data;
        }
        catch(error){
            console.log("Server Error.."+error)
        }
});

export const BookingSlice=createSlice({
    name:"booking",

    initialState,

    reducers:{},

    extraReducers:(builder)=>{

        builder

        .addCase(saveBooking.pending,(state)=>{
            state.isLoading=true;
        })

        .addCase(saveBooking.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.message=action.payload;
        })

        .addCase(saveBooking.rejected,(state)=>{
            state.isLoading=false;
            state.isError=true;
        })

        .addCase(getBookings.pending,(state)=>{
            state.isLoading=true;
        })

        .addCase(getBookings.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.bookings=action.payload;
        })

        .addCase(getBookings.rejected,(state)=>{
            state.isLoading=false;
            state.isError=true;
        })

        .addCase(delBooking.fulfilled,(state,action)=>{
            state.bookings=state.bookings.filter(
                (booking)=>booking._id!==action.payload
            );

            state.message="Booking Deleted";
        })

        .addCase(updBooking.fulfilled,(state,action)=>{
            state.message=action.payload;
        })
    }
});

export default BookingSlice.reducer;