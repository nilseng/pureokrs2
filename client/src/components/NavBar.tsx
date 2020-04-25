import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

import { useAuth0 } from "../react-auth0-spa";
import AnimatedLogo from "./AnimatedLogo";
import "../styles/common/navLink.css";

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth0();

  return (
    isAuthenticated && (
      <Navbar
        bg="light"
        expand="md"
        style={{ boxShadow: "0px 1px 5px #1c2e3f" }}
      >
        <Navbar.Brand href="/okr-tree">
          <AnimatedLogo color={"#1c2e3f"} height={"3rem"} width={"3rem"} />
          <span className="ml-2">Pure Objectives and Key Results</span>
        </Navbar.Brand>
        <Navbar.Toggle
          className="mb-2"
          aria-controls="basic-navbar-nav"
          style={{ outline: "none" }}
        />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Item className="mr-2">
              <Button variant="outline-primary">New OKR</Button>
            </Nav.Item>
            <Nav.Link className="mr-2" href="/profile">
              Profile
            </Nav.Link>
            <Nav.Link className="mr-2" onClick={() => logout()}>
              Log out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  );
};

export default NavBar;
