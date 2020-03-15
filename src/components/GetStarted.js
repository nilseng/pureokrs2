import React from "react";

import "../styles/GetStarted.css";
import "../styles/common/buttonLight.css";
import "../styles/common/buttonLinkLight.css";
import AnimatedLogo from "./AnimatedLogo";

const GetStarted = () => {
  return (
    <>
      <AnimatedLogo />
      <div className="container" style={{ minHeight: "100vh" }}>
        <div style={{ paddingTop: "20vh" }}>
          <label>
            Get started by entering your first objective. <br /> What would you
            like to accomplish?
          </label>
          <br />
          <input style={{ marginTop: "5vh" }} placeholder="Enter Objective" />
          <br />
          <button className="buttonLight" style={{ marginTop: "5vh" }}>
            Continue
          </button>
          <br />
          <button className="buttonLink">Skip</button>
        </div>
      </div>
    </>
  );
};

export default GetStarted;
