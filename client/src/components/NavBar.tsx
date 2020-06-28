import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useLocation } from "react-router-dom";

import { useAuth0 } from "../react-auth0-spa";
import AnimatedLogo from "./AnimatedLogo";
import "../styles/common/navLink.css";
import CreateOKR from "./CreateOKR";

const useWindowWidth = () => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const updateWidth = () => {
      setWidth(window.innerWidth);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
  });
  return width;
};

const NavBar = ({ setOkr, setEditObjective }: any) => {
  const { isAuthenticated, logout } = useAuth0();
  const location = useLocation();
  const width = useWindowWidth();
  const title = width >= 768 ? "Pure Objectives and Key Results" : "PureOKRs";

  return (
    <Navbar
      bg="light"
      expand="md"
      collapseOnSelect
      style={{ boxShadow: "0px 1px 5px #1c2e3f" }}
    >
      <Navbar.Brand href="/okr-tree">
        <AnimatedLogo color={"#1c2e3f"} height={"3rem"} width={"3rem"} />
        <span className="ml-2">{title}</span>
      </Navbar.Brand>
      <Navbar.Toggle
        className="mb-2"
        aria-controls="basic-navbar-nav"
        style={{ outline: "none" }}
      />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>
          {isAuthenticated && (
            <>
              {location && location.pathname !== "/profile" && (
                <Nav.Item className="mr-2">
                  <CreateOKR
                    setOkr={setOkr}
                    setEditObjective={setEditObjective}
                  />
                </Nav.Item>
              )}
              <Nav.Link className="mr-2" href="/profile">
                Profile
              </Nav.Link>
              <Nav.Link className="mr-2" onClick={() => logout()}>
                Log out
              </Nav.Link>
            </>
          )}
          {!isAuthenticated && (
            <Nav.Link className="mr-2" href="/okr-tree">
              Log In
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
