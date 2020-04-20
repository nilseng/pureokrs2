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
          <AnimatedLogo color={"#1c2e3f"} height={"4rem"} width={"4rem"} />
          Pure Objectives and Key Results
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Item>
              <Button variant="outline-primary" className="mr-4">
                New OKR
              </Button>
            </Nav.Item>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link onClick={() => logout()}>Log out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  );
};

export default NavBar;
