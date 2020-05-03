import React from "react";
import AnimatedLogo from "./AnimatedLogo";

import "../styles/Loading.scss";

const Loading = () => {
  return (
    <div id="loadingContainer">
      <AnimatedLogo color="#1c2e3f" />
    </div>
  );
};

export default Loading;
