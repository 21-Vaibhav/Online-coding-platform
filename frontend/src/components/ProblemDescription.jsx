import React from "react";

const ProblemDescription = ({ title, description, input, output }) => {
  return (
    <div style={styles.container}>
      <div style={styles.lhs}>
        {/* Problem Title */}
        <h1 style={styles.title}>{title}</h1>

        {/* Problem Description */}
        <div style={styles.section}>
          <h3>Description</h3>
          <p>{description}</p>
        </div>

        {/* Problem Input */}
        <div style={styles.section}>
          <h3>Input</h3>
          <p>{input}</p>
        </div>

        {/* Problem Output */}
        <div style={styles.section}>
          <h3>Output</h3>
          <p>{output}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
    height: "100vh",
    backgroundColor: "#2d2d2d", // Dark background to match the style
  },
  lhs: {
    width: "50%",
    paddingRight: "20px",
    overflowY: "auto",
    color: "#fff",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  section: {
    marginBottom: "20px",
  },
  rhs: {
    width: "50%",
    paddingLeft: "20px",
    color: "#fff",
    backgroundColor: "#1c1c1c",
    borderRadius: "8px",
  },
};

export default ProblemDescription;
