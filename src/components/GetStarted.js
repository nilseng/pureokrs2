import React from "react";

import "../styles/GetStarted.css";
import "../styles/common/buttonLight.css";
import "../styles/common/buttonLinkLight.css";
import AnimatedLogo from "./AnimatedLogo";

const GetStarted = () => {
  return (
    <>
      <AnimatedLogo />
      <div className="container">
        <div className="formContainer">
          <label>
            Get started by entering your first objective. <br /> What would you
            like to accomplish?
          </label>
          <br />
          <input placeholder="Enter Objective" />
          <br />
          <button className="buttonLight continueButton">Continue</button>
          <br />
          <button className="buttonLink">Skip</button>
        </div>
      </div>
    </>
  );
};

export default GetStarted;
