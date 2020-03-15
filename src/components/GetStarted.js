import React, { useEffect, useState } from "react";

import "../styles/GetStarted.css";
import "../styles/common/buttonLight.css";
import "../styles/common/buttonLinkLight.css";
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

const GetStarted = () => {
  const height = useWindowHeight();
  return (
    <>
      <AnimatedLogo />
      <div className="container" style={{ minHeight: height }}>
        <div style={{ paddingTop: height / 6 }}>
          <label>
            Get started by entering your first objective. <br /> What would you
            like to accomplish?
          </label>
          <br />
          <input
            style={{ marginTop: height / 10 }}
            placeholder="Enter Objective"
          />
          <br />
          <button className="buttonLight" style={{ marginTop: "1rem" }}>
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
