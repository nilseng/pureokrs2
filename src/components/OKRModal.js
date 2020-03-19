import React from "react";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "../styles/OKRModal.css";

const OKRModal = props => {
  return props.okr ? (
    <div id="OKRModal">
      <button onClick={() => props.setOkr(null)}>
        <FaIcon
          icon={faTimes}
          style={{
            color: "#f8f9fa",
            margin: "1rem",
            fontSize: "3rem"
          }}
        />
      </button>
      <div style={{ textAlign: "center", color: "#f8f9fa" }}>
        <b>{props.okr.name}</b>
        <br />
        {props.okr.keyResults && props.okr.keyResults.map(kr => <p>{kr.kr}</p>)}
      </div>
    </div>
  ) : null;
};

export default OKRModal;
