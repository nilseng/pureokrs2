import React, { useState } from "react";
import * as d3 from "d3";

import OKRModal from "./OKRModal";

const myTreeData = [
  {
    name: "Pure Objectives and Key Results",
    attributes: {},
    children: [
      {
        name: "Build a great OKR tool",
        parent: "Pure Objectives and Key Results",
        keyResults: [
          { kr: "Something you can measure" },
          { kr: "Something challenging, but possible" },
        ],
        children: [
          {
            name: "Design a nice tree",
            parent: "Build a great OKR tool",
          },
        ],
        attributes: {
          1: "Have x users",
          2: "Get some kudos on product hunt",
        },
      },
      {
        name: "Have fun",
        parent: "Pure Objectives and Key Results",
        children: [
          {
            name: "child of child",
            parent: "Have fun",
          },
          {
            name: "second child of child",
            parent: "Have fun",
          },
        ],
      },
    ],
  },
];

const Home = () => {
  const [okr, setOkr] = useState();
  const tree = d3.tree();
  tree.size([100, 100]);
  tree.nodeSize([20, 12]);
  tree.separation(function separation(a, b) {
    return a.parent === b.parent ? 1.0 : 1.4;
  });
  const root: d3.HierarchyPointNode<any> = tree(d3.hierarchy(myTreeData[0]));
  const nodes = root.descendants().reverse();
  nodes.forEach((node) => {
    node.x += 50;
    node.y += 10;
  });
  const links = root.links();

  return (
    <>
      <OKRModal okr={okr} setOkr={setOkr} />
      <div
        style={{
          height: "100vh",
          width: "200vw",
          backgroundColor: "#f8f9fa",
          position: "fixed",
          transform: "rotate(-30deg) translate(20vw, -40vh)",
          zIndex: -1,
          borderRadius: "2rem",
        }}
      ></div>
      <div
        id="treeWrapper"
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <svg
          id="okrTree"
          height={"100vh"}
          width={"100vw"}
          viewBox={"0 0 100 100"}
        >
          {links.map((link) => (
            <path
              d={`M ${link.source.x} ${link.source.y} L ${link.target.x} ${link.target.y} `}
              stroke="#1c2e3f"
              strokeWidth="0.1"
            ></path>
          ))}
          {nodes.map((node) => (
            <g>
              <circle
                cx={node.x}
                cy={node.y}
                r="1"
                fill="#1c2e3f"
                style={{ cursor: "pointer" }}
                onClick={() => setOkr(node.data)}
              />
              <text x={node.x + 2} y={node.y + 0.3} style={{ fontSize: "1.5" }}>
                {node.data.name}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </>
  );
};

export default Home;
