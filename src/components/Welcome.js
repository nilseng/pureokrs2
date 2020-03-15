import React from "react";
import { Link } from "react-router-dom";

import "../styles/Welcome.css";
import "../styles/common/buttonLight.css";
import "../styles/common/buttonDark.css";
import AnimatedLogo from "./AnimatedLogo";

const Welcome = () => {
  return (
    <header>
      <AnimatedLogo />
      <div className="topBox" style={{ minHeight: "50vh" }}>
        <Link style={{ outline: "none" }} to="/getstarted">
          <button className="buttonLight" style={{ marginTop: "20vh" }}>
            Get started
          </button>
        </Link>
      </div>
      <div className="bottomBox" style={{ minHeight: "50vh" }}>
        <button className="buttonDark" style={{ marginTop: "15vh" }}>
          Login
        </button>
      </div>
    </header>
  );
};

export default Welcome;
