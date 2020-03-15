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
    updateHeight();
    window.addEventListener("orientationchange", updateHeight);
    return () => window.removeEventListener("orientationchange", updateHeight);
  });
  return height;
};

const Welcome = () => {
  const height = useWindowHeight();
  return (
    <header>
      <AnimatedLogo />
      <div className="topBox" style={{ minHeight: height / 2 }}>
        <Link style={{ outline: "none" }} to="/getstarted">
          <button className="buttonLight" style={{ marginTop: height / 6 }}>
            Get started
          </button>
        </Link>
      </div>
      <div className="bottomBox" style={{ minHeight: height / 2 }}>
        <button className="buttonDark" style={{ marginTop: height / 8 }}>
          Login
        </button>
        <Footer style={{ marginTop: height / 6 }} />
      </div>
    </header>
  );
};

export default Welcome;
