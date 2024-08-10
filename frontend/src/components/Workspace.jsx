import React, { useEffect, useState } from "react";
import Split from "react-split";
import ArenaCodeEditor from "./ArenaCodeEditor";
import ProblemDescription from "./ProblemDescription";

const Workspace = ({ problemId }) => {
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/problem/${problemId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProblem(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching problem:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (problemId) {
      fetchProblem();
    }
  }, [problemId]);

  const splitStyle = {
    display: "flex",
    height: "100vh",
  };

  const sectionStyle = {
    overflow: "auto",
    flex: 1,
    backgroundColor: "#1e1e1e",
    color: "white",
    padding: "20px",
    boxSizing: "border-box",
  };

  const editorStyle = {
    ...sectionStyle,
    backgroundColor: "#252526",
  };

  // Select the first test case for simplicity
  const testCase =
    problem && problem.testCases && problem.testCases.length > 0
      ? problem.testCases[0]
      : null;

  return (
    <Split
      sizes={[50, 50]}
      direction="horizontal"
      cursor="col-resize"
      style={splitStyle}
    >
      <div style={sectionStyle}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : problem ? (
          <ProblemDescription
            title={problem.title}
            description={problem.description}
            input={testCase ? testCase.input : "No input available"}
            output={testCase ? testCase.output : "No output available"}
          />
        ) : (
          <p>No problem data found</p>
        )}
      </div>

      <div style={editorStyle}>
        <ArenaCodeEditor />
      </div>
    </Split>
  );
};

export default Workspace;
