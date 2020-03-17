import React, { useState, useLayoutEffect, useEffect } from "react";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { NavLink, Link } from "react-router-dom";

import "../styles/GetStarted.css";
import "../styles/common/buttonLight.css";
import "../styles/common/buttonLinkLight.css";
import AnimatedLogo from "./AnimatedLogo";

const GetStarted = () => {
  const [objective, setObjective] = useState("");
  const [showKeyResults, setShowKeyResults] = useState(false);
  const [keyResults, setKeyResults] = useState([""]);
  useLayoutEffect(() => {
    if (showKeyResults) {
      document.getElementById("newKR").focus();
    } else {
      document.getElementById("objective").focus();
    }
  }, [showKeyResults]);

  const addKeyResult = () => {
    if (!!document.getElementById("newKR").value) {
      document.getElementById("newKR").value = "";
      setKeyResults(["", ...keyResults]);
    }
    document.getElementById("newKR").focus();
  };

  const useKeyPress = () => {
    useEffect(() => {
      const handleKeyPress = event => {
        if (
          showKeyResults &&
          !!document.getElementById("newKR").value &&
          event.key === "Enter"
        ) {
          addKeyResult();
        }
        if (!showKeyResults && objective && event.key === "Enter") {
          setShowKeyResults(true);
        }
      };
      document.addEventListener("keydown", handleKeyPress);
      return () => document.removeEventListener("keydown", handleKeyPress);
    });
  };

  useKeyPress();
  return (
    <>
      <NavLink to="/">
        <AnimatedLogo />
      </NavLink>
      <div className="container" style={{ minHeight: "100vh" }}>
        <div style={{ paddingTop: "20vh" }}>
          {(!showKeyResults || !objective) && (
            <>
              <label>
                Get started by entering your first objective. <br /> What would
                you like to accomplish?
              </label>
              <br />
              <input
                id="objective"
                style={{ marginTop: "5vh" }}
                placeholder="Enter Objective..."
                onChange={e => setObjective(e.target.value)}
              />
              <br />
              <button
                className="buttonLight"
                style={{ marginTop: "5vh" }}
                onClick={() => setShowKeyResults(!!objective)}
              >
                Continue
              </button>
              <br />
              <Link to="/home">
                <button className="buttonLink">Skip</button>
              </Link>
            </>
          )}
          {showKeyResults && objective && (
            <>
              <label>
                Which measurable Key Results do you need to achieve in order to
                <br />
                <i>{objective}</i>?
              </label>
              <br />
              <input
                id="newKR"
                style={{ marginTop: "5vh" }}
                placeholder="Enter new Key Result..."
                onChange={e => {
                  setKeyResults([
                    e.target.value,
                    ...keyResults.slice(1, keyResults.length)
                  ]);
                }}
              />
              <br />
              <div style={{ textAlign: "left" }}>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    color: "#f8f9fa",
                    fontSize: "2rem",
                    marginTop: "0.5rem",
                    padding: "0",
                    cursor: "pointer",
                    outline: "none"
                  }}
                  onClick={addKeyResult}
                >
                  <FaIcon icon={faPlus} />
                </button>
              </div>
              {keyResults.map(
                (kr, i) =>
                  !!kr && (
                    <div
                      key={i}
                      style={{
                        backgroundColor: "#3c6285",
                        textAlign: "left",
                        padding: "0.5rem",
                        minHeight: "1.2rem",
                        borderRadius: "4px",
                        fontSize: "1rem",
                        fontWeight: "200",
                        marginTop: "0.5rem"
                      }}
                    >
                      {kr}
                    </div>
                  )
              )}
              <Link to="home">
                <button className="buttonLight" style={{ marginTop: "5vh" }}>
                  Continue
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default GetStarted;
