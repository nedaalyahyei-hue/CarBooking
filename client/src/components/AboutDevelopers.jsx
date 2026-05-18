import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { FaUserCircle } from "react-icons/fa";

const AboutDevelopers = () => {
  return (
    <div>
      <Header />

      <div className="aboutPage">
        <h1>About Developers</h1>
        <p>Here information about our developers team</p>

        <div className="developersBox">
          <div className="developerCard">
            <FaUserCircle className="userIcon" />
            <h2>Nada Ali</h2>
            <p>Fronetend Developer</p>
          </div>

          <div className="developerCard">
            <FaUserCircle className="userIcon" />
            <h2>Aisha dawood</h2>
            <p>Fronetend Developer</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutDevelopers;