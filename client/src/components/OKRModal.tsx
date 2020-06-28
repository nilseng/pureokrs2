import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import "../styles/OKRModal.scss";

const OKRModal = ({
  okr,
  setOkr,
  handleDeleteOkr,
  editObjective,
  setEditObjective,
  updateOkr,
}: any) => {
  const handleClose = async () => {
    await updateOkr({
      variables: okr,
    });
    setOkr(null);
    setEditObjective(false);
  };

  const handleChangedObjective = async (e: any) => {
    e.persist();
    await setOkr((prevOkr: any) => ({
      ...prevOkr,
      objective: e.target.value,
    }));
  };

  return okr ? (
    <Modal
      show={!!okr}
      style={{ borderRadius: 0 }}
      centered
      onHide={handleClose}
    >
      <Modal.Header style={{ borderRadius: 0 }} closeButton>
        <Modal.Title>
          {!editObjective && (
            <div className="objective" onClick={() => setEditObjective(true)}>
              {okr.objective}
            </div>
          )}
          {editObjective && (
            <InputGroup>
              <FormControl
                value={okr.objective}
                onChange={(e: any) => handleChangedObjective(e)}
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
        {okr.keyResults &&
          okr.keyResults.map((kr: any) => <p key={kr._id}>{kr.keyResult}</p>)}
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="deleteButton"
          variant="outline-danger"
          onClick={() => handleDeleteOkr(okr)}
        >
          Delete OKR
        </Button>
      </Modal.Footer>
    </Modal>
  ) : null;
};

export default OKRModal;
