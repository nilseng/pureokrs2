import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import "../styles/OKRModal.scss";

const OKRModal = (props: any) => {
  const handleClose = () => {
    props.setOkr(null);
    setEditObjective(false);
  };
  const [editObjective, setEditObjective] = useState(false);

  return props.okr ? (
    <Modal
      show={!!props.okr}
      style={{ borderRadius: 0 }}
      centered
      onHide={handleClose}
    >
      <Modal.Header style={{ borderRadius: 0 }} closeButton>
        <Modal.Title>
          {!editObjective && (
            <div className="objective" onClick={() => setEditObjective(true)}>
              {props.okr.objective}
            </div>
          )}
          {editObjective && (
            <InputGroup>
              <FormControl
                value={props.okr.objective}
                onChange={(e: any) => {
                  e.persist();
                  props.setOkr((prevOkr: any) => {
                    return {
                      ...prevOkr,
                      objective: e.target.value,
                    };
                  });
                }}
              ></FormControl>
              <InputGroup.Append>
                <Button
                  variant="outline-success"
                  onClick={() => setEditObjective(false)}
                >
                  <FaIcon icon={faCheck}></FaIcon>
                </Button>
              </InputGroup.Append>
            </InputGroup>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.okr.keyResults &&
          props.okr.keyResults.map((kr: any) => (
            <p key={kr._id}>{kr.keyResult}</p>
          ))}
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="deleteButton"
          variant="outline-danger"
          onClick={() => props.handleDeleteOkr(props.okr)}
        >
          Delete OKR
        </Button>
      </Modal.Footer>
    </Modal>
  ) : null;
};

export default OKRModal;
