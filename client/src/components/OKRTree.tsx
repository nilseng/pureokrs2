import React, { useState, useLayoutEffect } from "react";
import * as d3 from "d3";

const OKRTree = (props: any) => {
  props.okrs.map((okr: any) => (okr.name = okr.objective));
  const rootOkr = { id: "root", name: "Your OKRs", children: props.okrs };
  const tree = d3.tree();
  tree.size([100, 100]);
  tree.nodeSize([20, 12]);
  tree.separation(function separation(a, b) {
    return a.parent === b.parent ? 1.0 : 1.4;
  });
  const root: d3.HierarchyPointNode<any> = tree(d3.hierarchy(rootOkr));
  const nodes = root.descendants().reverse();
  nodes.forEach((node) => {
    node.x += 50;
    node.y += 10;
  });
  const links = root.links();

  const [svgTranslate, setSvgTranslate] = useState("translate(0,0) scale(1)");

  useLayoutEffect(() => {
    const svg: any = d3.select(document.getElementById("okrTree"));
    const zoom = d3.zoom().on("zoom", zoomed);
    svg.call(zoom);
  });

  const zoomed = () => {
    let svgTransform = d3.event.transform;
    setSvgTranslate(
      `translate(${svgTransform.x},${svgTransform.y}) scale(${svgTransform.k})`
    );
  };

  return (
    <>
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
          height={"100%"}
          width={"100%"}
          viewBox={"0 0 100 100"}
        >
          <g transform={svgTranslate}>
            {links.map((link) => (
              <path
                key={`${link.source.data.id}-${link.target.data.id}`}
                d={`M ${link.source.x} ${link.source.y} L ${link.target.x} ${link.target.y} `}
                stroke="#1c2e3f"
                strokeWidth="0.1"
              ></path>
            ))}
            {nodes.map((node) => (
              <g key={node.data.id}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="1"
                  fill="#1c2e3f"
                  style={{ cursor: "pointer" }}
                  onClick={() => props.setOkr(node.data)}
                />
                <text
                  x={node.x + 2}
                  y={node.y + 0.3}
                  style={{ fontSize: "1.5" }}
                >
                  {node.data.name}
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>
    </>
  );
};

export default OKRTree;
