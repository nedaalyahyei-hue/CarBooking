import React, { useState, useEffect } from "react";
import Header from "./Header";
import { FaMapMarkerAlt } from "react-icons/fa";
import carImage from "../assets/home.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [cartype, setCartype] = useState("Sedan");
  const [size, setSize] = useState("Small");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
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

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      });
    }
  };

  const handleSearch = () => {
    const bookingData = {
      cartype,
      size,
      startdate,
      enddate,
      lat,
      lng
    };

    navigate("/search", {
      state: bookingData
    });
  };

  return (
    <div>
      <Header />
      <div className="heroSection">
        <div className="leftHero">
          <h1>Car Book System</h1>
          <p> Find and book your perfect car easily </p>
        </div>
        <div className="rightHero">
          <img src={carImage} alt="" />
        </div>
      </div>

      <div className="bookingSection">
        <div className="inputBox">
          <label>Type of Car</label>
          <select onChange={(e) => setCartype(e.target.value)}>
            {
              cars.map((car) => (
                <option key={car._id}> {car.cartype} </option>
              ))
            }
          </select>

        </div>

        <div className="inputBox">
          <label>Size</label>
          <select onChange={(e) => setSize(e.target.value)}
          >
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select>

        </div>

        <div className="inputBox">
          <label>Start Date</label>
          <input type="date" onChange={(e) => setStartdate(e.target.value)} />
        </div>

        <div className="inputBox">
          <label>End Date</label>
          <input type="date" onChange={(e) => setEnddate(e.target.value)} />
        </div>
      </div>

      <div className="bookBtnBox">
        <button onClick={handleSearch}> Search / Book </button>
      </div>

      <div className="locationBox">
        <button className="locationBtn" onClick={getLocation}><FaMapMarkerAlt /> Get Location </button>

        <div className="locationText">
          {lat && lng
            ? `${lat} , ${lng}`
            : "Location Not Added"}
        </div>
      </div>
    </div>
  );
};
export default Home;