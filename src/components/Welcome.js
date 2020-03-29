import React from "react";
import { Link, NavLink } from "react-router-dom";

import "../styles/Welcome.css";
import "../styles/common/buttonLight.css";
import "../styles/common/buttonDark.css";

import AnimatedLogo from "./AnimatedLogo";

const Welcome = () => {
  return (
    <header>
      <NavLink to="okr-tree">
        <AnimatedLogo />
      </NavLink>
      <div className="topBox" style={{ minHeight: "50vh" }}>
        <Link style={{ outline: "none" }} to="getstarted">
          <button className="buttonLight" style={{ marginTop: "20vh" }}>
            Get started
          </button>
        </Link>
      </div>
      <div className="bottomBox" style={{ minHeight: "50vh" }}>
        <Link to="okr-tree">
          <button className="buttonDark" style={{ marginTop: "15vh" }}>
            Login
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Welcome;
