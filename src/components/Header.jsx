import React from "react";
import { CiLogout } from "react-icons/ci";
import { FaCircleUser } from "react-icons/fa6";
import loginPhoto from "../assets/avatar-icon.webp";
import { NavLink, Link } from "react-router-dom";
import { signOutUser } from "../api";

const Header = () => {
  return (
    <header>
      <Link to="/" className="site-logo">
        #VANLIFE
      </Link>
      <nav className="header-nav">
        <NavLink
          to="host"
          className={({ isActive }) => (isActive ? "currentlyActive" : null)}
        >
          Host
        </NavLink>
        <NavLink
          to="about"
          className={({ isActive }) => (isActive ? "currentlyActive" : null)}
        >
          About
        </NavLink>
        <NavLink
          to="vans"
          className={({ isActive }) => (isActive ? "currentlyActive" : null)}
        >
          Van
        </NavLink>
        <Link to="login" className="login-link">
          <FaCircleUser className="login-icon" />
        </Link>
        <Link to="login" onClick={signOutUser} className="login-link">
          <CiLogout className="login-icon" />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
