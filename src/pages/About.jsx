import React from "react";
import aboutPhoto from "../assets/image 55.png";
import { FaRegCopyright } from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about-container">
      <img className="image" src={aboutPhoto} alt="bus image" />
      <div className="text-cont">
        <h1>Don't squeeze in a sedan when you could relax in a van</h1>
        <p className="about-para-1">
          Our mission is to enliven your road trip with the perfect travel van
          rental.Our vans are recertified before each trip to ensure your travel
          plans can go off without a hitch. (Hitch costs extra😉)
        </p>
        <p className="about-para-2">
          Our team is full of vanlife enthusiasts who know firsthand and the
          magic of touring the world on four wheels
        </p>
        <div className="about-border">
          <p>
            Your destination is waiting.
            <br></br>
            Your van is ready
          </p>
          <div className="about-lnk">
            <Link to="/van">
              Explore our vans
            </Link>
          </div>
        </div>
      </div>
      {/* <footer className="about-footer">
        <div>
          <p>
            <FaRegCopyright />
            2022 #VANLIFE
          </p>
        </div>
      </footer> */}
    </div>
  );
};

export default About;
