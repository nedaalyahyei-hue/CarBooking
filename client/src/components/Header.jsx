import React from "react";
import { FaCarSide } from "react-icons/fa";

const Header = () => {
  return (
    <div className="header">
      <div className="logoBox">
        <FaCarSide className="logoIcon" />
        <h2>CarBook</h2>
      </div>

      <div className="navLinks">
        <a href="/home">Home</a>
        <a href="/mybooking">My Booking</a>
        <a href="/about">About Developers</a>
      </div>

      <div className="rightNav">
        <input type="text" placeholder="Search.." />
        <a href="/login">
          <button>Logout</button>
        </a>
      </div>
    </div>
  );
};
export default Header;