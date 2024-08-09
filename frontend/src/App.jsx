// app.jsx

import React, { useState } from "react";
import axios from "axios";

function App() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const handleCompile = async () => {
    try {
      const response = await axios.post("http://localhost:3001/compile", {
        code,
      });
      setOutput(response.data.output);
    } catch (error) {
      setOutput(error.response.data.error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>C++ Code Editor</h1>
      <textarea
        rows="10"
        cols="50"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your C++ code here"
        style={{ width: "100%", fontSize: "16px", fontFamily: "monospace" }}
      />
      <br />
      <button
        onClick={handleCompile}
        style={{ marginTop: "10px", padding: "10px 20px" }}
      >
        Compile & Run
      </button>
      <h2>Output:</h2>
      <pre style={{ background: "#f4f4f4", padding: "10px" }}>{output}</pre>
    </div>
  );
}

export default App;
