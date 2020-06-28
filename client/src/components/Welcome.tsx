import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

import "../styles/Welcome.css";
import "../styles/common/buttonLight.css";
import "../styles/common/buttonDark.css";

const Welcome = () => {
  return (
    <>
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
            Log In
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Welcome;
