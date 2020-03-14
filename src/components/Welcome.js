import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../styles/Welcome.css";
import "../styles/common/buttonLight.css";
import "../styles/common/buttonDark.css";
import Footer from "./Footer";
import AnimatedLogo from "./AnimatedLogo";

const useWindowHeight = () => {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    function updateHeight() {
      setHeight(window.innerHeight);
    }
    window.addEventListener("resize", updateHeight);
    updateHeight();
    return () => window.removeEventListener("resize", updateHeight);
  }, []);
  return height;
};

const Welcome = () => {
  const height = useWindowHeight();
  return (
    <header>
      <AnimatedLogo />
      <div className="topBox" style={{ minHeight: height / 2 }}>
        <Link style={{ outline: "none" }} to="/getstarted">
          <button className="buttonLight getStartedButton">Get started</button>
        </Link>
      </div>
      <div className="bottomBox" style={{ minHeight: height / 2 }}>
        <button className="buttonDark loginButton">Login</button>
        <Footer />
      </div>
    </header>
  );
};

export default Welcome;
