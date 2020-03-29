import React from "react";

const AnimatedLogo = ({ color = "#f8f9fa" }) => {
  return (
    <svg
      style={{
        position: "absolute",
        height: "5rem",
        width: "5rem",
        margin: "1rem"
      }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
    >
      <circle cx="50" cy="10" r="3" fill={color} />
      <line x1="50" x2="35" y1="10" y2="30" stroke={color} />
      <circle cx="35" cy="30" r="3" fill={color} />
      <line x1="50" x2="65" y1="10" y2="30" stroke={color} />
      <circle cx="65" cy="30" r="3" fill={color} />
      <line x1="35" x2="25" y1="30" y2="50" stroke={color} />
      <circle cx="25" cy="50" r="3" fill={color} />
      <line x1="35" x2="45" y1="30" y2="50" stroke={color} />
      <circle cx="45" cy="50" r="3" fill={color} />
      <line x1="65" x2="55" y1="30" y2="50" stroke={color} />
      <circle cx="55" cy="50" r="3" fill={color} />
      <line x1="65" x2="75" y1="30" y2="50" stroke={color}>
        <animate
          attributeName="x2"
          values="65;75;65"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y2"
          values="30;50;30"
          dur="2s"
          repeatCount="indefinite"
        />
      </line>
      <circle cx="75" cy="50" r="3" fill={color}>
        <animate
          attributeName="cx"
          values="65;75;65"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="cy"
          values="30;50;30"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};

export default AnimatedLogo;