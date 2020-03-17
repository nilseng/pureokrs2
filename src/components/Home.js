import React from "react";
import Tree from "react-d3-tree";

import AnimatedLogo from "./AnimatedLogo";
import "../styles/Home.css";

const myTreeData = [
  {
    name: "Pure Objectives and Key Results",
    attributes: {},
    children: [
      {
        name: "Build a great OKR tool",
        attributes: {
          1: "Have x users",
          2: "Get some kudos on product hunt"
        }
      },
      {
        name: "Be self employed"
      }
    ]
  }
];

const Home = () => {
  return (
    <>
      <AnimatedLogo color={"#1c2e3f"} />
      <div
        style={{
          height: "100vh",
          width: "200vw",
          backgroundColor: "#f8f9fa",
          position: "fixed",
          transform: "rotate(-30deg) translate(20vw, -40vh)",
          zIndex: -1,
          borderRadius: "2rem"
        }}
      ></div>
      <div
        id="treeWrapper"
        style={{
          width: "100vw",
          height: "100vh"
        }}
      >
        <Tree
          data={myTreeData}
          orientation={"vertical"}
          translate={{ x: window.innerWidth / 2, y: 100 }}
          textLayout={{
            textAnchor: "start",
            x: -95,
            y: 20,
            transform: undefined
          }}
          nodeSize={{ x: 200, y: 100 }}
          pathFunc={"straight"}
          styles={{
            links: { stroke: "#1c2e3f" },
            nodes: { fill: "#1c2e3f", text: { fill: "#f8f9fa" } }
          }}
          nodeSvgShape={{
            shape: "rect",
            shapeProps: {
              fill: "#1c2e3f",
              width: 180,
              height: 90,
              x: -100,
              stroke: "none",
              rx: 4,
              ry: 4
            }
          }}
          zoom={1}
        />
      </div>
    </>
  );
};

export default Home;
