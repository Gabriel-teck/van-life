import React from "react";
import { NavLink,Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/" className="site-logo">
        #VANLIFE
      </Link>
      <nav className="header-nav">
        <NavLink
          to="/host"
          className={({ isActive }) => (isActive ? 'currentlyActive' : null)}
        >
          Host
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? 'currentlyActive' : null)}
        >
          About
        </NavLink>
        <NavLink
          to="/vans"
          className={({ isActive }) => (isActive ? 'currentlyActive' : null)}
        >
          Van
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
