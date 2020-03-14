import React from "react";
import { Link } from "react-router-dom";

import "../styles/Welcome.css";
import "../styles/common/buttonLight.css";
import Footer from "./Footer";
import AnimatedLogo from "./AnimatedLogo";

const Welcome = () => {
  return (
    <header>
      <AnimatedLogo />
      <div className="topBox">
        <Link to="/getstarted">
          <button className="buttonLight">Get started</button>
        </Link>
      </div>
      <div className="bottomBox">
        <button className="buttonDark">Login</button>
        <Footer />
      </div>
    </header>
  );
};

export default Welcome;
