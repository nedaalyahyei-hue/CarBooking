import React from "react";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { saveBooking } from "../features/BookingSlice";
import { useLocation } from "react-router-dom";

const Search = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const {
    cartype,
    size,
    startdate,
    enddate,
    lat,
    lng
  } = location.state;

  const user = useSelector(
    (state) => state.user.user
  );

  const handleBooking = () => {
    let totalprice = 50;
    if (size === "Medium")
      totalprice = 70;

    if (size === "Large")
      totalprice = 90;

    const bookingData = {
      fullname: user.fullname,
      phone: user.phone,
      email: user.email,

      cartype,
      size,
      startdate,
      enddate,
      totalprice,
      lat,
      lng
    };
    dispatch(saveBooking(bookingData));
    alert("Booking Saved");
  };

  return (
    <div>
      <Header />
      <div className="bookCarPage">
        <h1>Book Your Car</h1>
        <div className="bookInfoBox">
          <div>
            <h2>Your Information</h2>
            <p>
              Full Name: {user.fullname}
            </p>
            <p>
              Phone Number: {user.phone}
            </p>
          </div>
          <div>
            <p>
              Car Type: {cartype}
            </p>
            <p>
              Size: {size}
            </p>
            <p>
              Start Date: {startdate}
            </p>
            <p>
              End Date: {enddate}
            </p>
          </div>
        </div>
        <h2 className="totalPrice">
          Total Price:
          <span>

            {
              size === "Small"
                ? " 50 OMR"
                : size === "Medium"
                  ? " 70 OMR"
                  : " 90 OMR"
            }
          </span>
        </h2>
        <button className="confirmBtn" onClick={handleBooking}> Confirm Booking </button>
      </div>
    </div>
  );
};
export default Search;