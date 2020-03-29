import React from "react";
import { NavLink } from "react-router-dom";

import { useAuth0 } from "../react-auth0-spa";

import "../styles/common/navLink.css";

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth0();

  return (
    <div style={{ position: "absolute", right: 0, padding: "1rem" }}>
      {isAuthenticated && (
        <>
          <span>
            <NavLink to="/profile" className="navLink">
              Profile
            </NavLink>
            <button onClick={() => logout()} className="navLink">
              Log out
            </button>
          </span>
        </>
      )}
    </div>
  );
};

export default NavBar;
