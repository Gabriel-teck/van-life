import React from "react";
import loginPhoto from "../assets/avatar-icon.webp"
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/" className="site-logo">
        #VANLIFE
      </Link>
      <nav className="header-nav">
        <NavLink
          to="/host"
          className={({ isActive }) => (isActive ? "currentlyActive" : null)}
        >
          Host
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "currentlyActive" : null)}
        >
          About
        </NavLink>
        <NavLink
          to="/vans"
          className={({ isActive }) => (isActive ? "currentlyActive" : null)}
        >
          Van
        </NavLink>
        <Link to="login" className="login-link">
          <img src={loginPhoto} 
          className="login-icon" />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
