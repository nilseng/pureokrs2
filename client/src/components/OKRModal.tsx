import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../styles/OKRModal.css";

const OKRModal = (props: any) => {
  const handleClose = () => props.setOkr(null);
  return props.okr ? (
    <Modal
      show={!!props.okr}
      style={{ borderRadius: 0 }}
      centered
      onHide={handleClose}
    >
      <Modal.Header style={{ borderRadius: 0 }} closeButton>
        <Modal.Title>{props.okr.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.okr.keyResults &&
          props.okr.keyResults.map((kr: any) => <p>{kr.kr}</p>)}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="outline-primary">Save Changes</Button>
      </Modal.Footer>{" "}
    </Modal>
  ) : null;
};

export default OKRModal;
