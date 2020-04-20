import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import { useAuth0 } from "../react-auth0-spa";

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container
        fluid
        className="pt-3"
        style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
      >
        <Row>
          <Col sm={2}>
            <Card style={{ width: "100%", minWidth: "18rem" }}>
              <Card.Img src={user.picture} alt="Profile" />
              <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                {user.updated_at && (
                  <p style={{ color: "gray", fontSize: "smaller" }}>
                    {new Date(user.updated_at).toLocaleString()}
                  </p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
