import React, { useState, useLayoutEffect } from "react";
import * as d3 from "d3";

import "../styles/OKRTree.scss";

const OKRTree = (props: any) => {
  const rootOkr = { _id: "root", children: props.okrs };
  const tree = d3.tree();
  tree.size([100, 100]);
  tree.nodeSize([20, 12]);
  tree.separation(function separation(a, b) {
    return a.parent === b.parent ? 1.0 : 1.4;
  });
  const root: d3.HierarchyPointNode<any> = tree(d3.hierarchy(rootOkr));
  const nodes = root.descendants();

  // Moving all nodes 50 px right to adjust for node width
  nodes.forEach((node) => {
    node.x += 50;
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
      <div className="rotatedRectBackground"></div>
      <div id="treeWrapper">
        <svg
          id="okrTree"
          height={"100%"}
          width={"100%"}
          viewBox={"0 0 100 100"}
        >
          <g transform={svgTranslate}>
            {links.map(
              (link) =>
                link.source.parent && (
                  <path
                    key={`${link.source.data._id}-${link.target.data._id}`}
                    d={`M ${link.source.x} ${link.source.y} L ${link.target.x} ${link.target.y} `}
                    stroke="#1c2e3f"
                    strokeWidth="0.1"
                  ></path>
                )
            )}
            {nodes.map(
              (node) =>
                node.parent && (
                  <g key={node.data._id}>
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
                      {node.data.objective}
                    </text>
                  </g>
                )
            )}
          </g>
        </svg>
      </div>
    </>
  );
};

export default OKRTree;
