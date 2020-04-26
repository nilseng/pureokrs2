import React from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";

import "../styles/Welcome.css";
import "../styles/common/buttonLight.css";
import "../styles/common/buttonDark.css";

import AnimatedLogo from "./AnimatedLogo";

const Welcome = () => {
  return (
    <header>
      <NavLink
        to="okr-tree"
        style={{
          position: "absolute",
          paddingTop: "0.8125rem",
          paddingLeft: "1rem",
        }}
      >
        <AnimatedLogo height={"3rem"} width={"3rem"} />
      </NavLink>
      <div className="topBox" style={{ minHeight: "50vh" }}>
        <Link style={{ outline: "none" }} to="getstarted">
          <Button
            size="lg"
            className="buttonLight"
            style={{ marginTop: "20vh" }}
          >
            Get started
          </Button>
        </Link>
      </div>
      <div className="bottomBox" style={{ minHeight: "50vh" }}>
        <Link to="okr-tree">
          <Button
            size="lg"
            className="buttonDark"
            style={{ marginTop: "15vh" }}
          >
            Login
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Welcome;
