import React, { useEffect } from "react";
import Header from "./Header";
import car1 from "../assets/car 1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getBookings, delBooking } from "../features/BookingSlice";
import { Link } from "react-router-dom";

const MyBookings = () => {
    const dispatch = useDispatch();
    const bookings = useSelector((state) => state.booking.bookings);
    const user = useSelector((state) => state.user.user);
    const savedUser = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        if (savedUser?.email) {
            dispatch(
                getBookings(savedUser.email)
            );

        }

    }, []);

    const deleteBooking = (bookingid) => {
        dispatch(delBooking(bookingid));
    };

    return (
        <div>
            <Header />
            <div className="myBookingsPage">
                <h1>My Booking</h1>
                {
                    bookings.map((booking, index) => (
                        <div className="bookingCard" key={booking._id}>
                            <div>
                                <img src={car1} alt="" className="bookingImg" />
                            </div>
                            <div className="bookingInfo">
                                <h2>Booking #{index + 1}</h2>
                                <p>Name: {booking.fullname}</p>
                                <p>Car: {booking.cartype}</p>
                                <p>Size: {booking.size}</p>
                            </div>

                            <div className="bookingInfo">
                                <p>From: {booking.startdate}</p>
                                <p>To: {booking.enddate}</p>
                                <p> Price: <span> {booking.totalprice}</span> </p>
                            </div>
                            <div className="bookingBtns">
                                <Link to="/editbooking" state={booking}>
                                    <button className="editBtn">Edit</button>
                                </Link>

                                <button className="deleteBtn"
                                    onClick={() => deleteBooking(booking._id)}> Delete</button>

                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    );
};
export default MyBookings;