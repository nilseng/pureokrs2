import React from "react";
import "../styles/Welcome.css";
import Footer from "./Footer";
import AnimatedLogo from "./AnimatedLogo";

const Welcome = () => {
  return (
    <header>
      <AnimatedLogo />
      <div className="topBox">
        <button className="buttonLight">Get started</button>
      </div>
      <div className="bottomBox">
        <button className="buttonDark">Login</button>
        <Footer />
      </div>
    </header>
  );
};

export default Welcome;
