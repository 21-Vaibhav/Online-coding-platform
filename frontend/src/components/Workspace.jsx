import React from "react";
import Split from "react-split";
import CodeEditor from "./CodeEditor";
import ProblemDescription from "./ProblemDescription";

const Workspace = () => {
  const splitStyle = {
    display: "flex",
    height: "100vh",
  };

  const sectionStyle = {
    overflow: "auto",
    flex: 1,
    backgroundColor: "#1e1e1e", // Same background as the original CSS
    color: "white",
    padding: "20px",
    boxSizing: "border-box",
  };

  const editorStyle = {
    ...sectionStyle, // inherit styles from sectionStyle
    backgroundColor: "#252526", // Different background for the editor
  };

  return (
    <Split
      sizes={[50, 50]} // 50-50 split
      direction="horizontal" // Horizontal split
      cursor="col-resize"
      style={splitStyle} // Inline style for the container
    >
      <div style={sectionStyle}>
        <ProblemDescription
          title="Two Sum"
          description="You are given an array of n integers, and your task is to find two values (at distinct positions) whose sum is x."
          input="The first input line has two integers n and x: the array size and the target sum."
          output="Print two integers: the positions of the values. If there are several solutions, you may print any of them. If there are no solutions, print -1."
        />
      </div>

      <div style={editorStyle}>
        <CodeEditor />
      </div>
    </Split>
  );
};

export default Workspace;
