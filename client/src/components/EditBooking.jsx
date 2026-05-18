import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updBooking } from "../features/BookingSlice";
import axios from "axios";

const EditBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const booking = location.state;
  const [cartype, setCartype] = useState(booking.cartype);
  const [size, setSize] = useState(booking.size);
  const [startdate, setStartdate] = useState(booking.startdate);
  const [enddate, setEnddate] = useState(booking.enddate);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const getCars = async () => {
      try {
        const response = await axios.get("http://localhost:3002/getCars");
        setCars(response.data.cars);
          }
      catch (error) {
        console.log(error);
      }
    };
    getCars();
  }, []);

  const updateBooking = () => {
    const totalprice = size === "Small" ? 50 : size === "Medium" ? 70 : 90;
    const bookingData = {
      bookingid: booking._id,
      fullname: booking.fullname,
      phone: booking.phone,
      email: booking.email,
      cartype,
      size,
      startdate,
      enddate,
      totalprice,
      lat: booking.lat,
      lng: booking.lng
    };

    dispatch(updBooking(bookingData));
    alert("Booking Updated");
    navigate("/mybooking");
  };

  return (
    <div className="editPage">
      <div className="editBox">
        <h1>Edit Booking</h1>
        <label>Name</label>
        <input type="text" value={booking.fullname} disabled />

        <label>Phone Number</label>
        <input type="text" value={booking.phone} disabled/>

        <label>Car Type</label>
        <select value={cartype} onChange={(e) => setCartype(e.target.value)}>
          {
            cars.map((car) => (
              <option key={car._id}> {car.cartype} </option>
            ))
          }
        </select>

        <div className="sizeBox">
          <b>Size :</b>
          <label>
            <input type="radio" name="size" value="Small" 
            checked={size === "Small"} onChange={(e) => setSize(e.target.value)} />
            Small
          </label>

          <label>
            <input type="radio" name="size" value="Medium"
              checked={size === "Medium"} onChange={(e) => setSize(e.target.value)} />
            Medium
          </label>

          <label>
            <input type="radio" name="size" value="Large"
              checked={size === "Large"}
              onChange={(e) => setSize(e.target.value)} />
            Large
          </label>
        </div>

        <div className="dateRow">
          <div>
            <label>Start Date</label>
            <input type="date" value={startdate} onChange={(e) => setStartdate(e.target.value)} />
          </div>

          <div>
            <label>End Date</label>
            <input type="date" value={enddate} onChange={(e) => setEnddate(e.target.value)} />
          </div>
        </div>
        <button onClick={updateBooking}> Update Booking </button>
        </div>
    </div>
  );
};
export default EditBooking;