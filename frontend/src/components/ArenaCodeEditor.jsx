import React, { useState, useEffect } from "react";
import axios from "axios";
import Prism from "prismjs";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism"; // Choose a style

function ArenaCodeEditor() {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  // const [language, setLanguage] = useState("cpp");

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleCompile = async () => {
    try {
      const response = await axios.post("http://localhost:3001/compile", {
        code,
        input,
      });
      setOutput(response.data.output);
    } catch (error) {
      setOutput(error.response.data.error);
    }
  };

  const handleSubmit = async () => {    
    try {
        const response = await axios.post("http://localhost:3001/submit", { 
            code,
            ///problem id need to be passed
            //input,
        });
        setOutput(response.data.output);
    } catch (error) {
        setOutput(error.response.data.error);
    }
};

  return (
    <div style={{ padding: "20px" }}>
      <h1>C++ Code Playground</h1>
      <br />
      <div style={{ position: "relative", width: "100%" }}>
        {/* Highlighted Code */}
        <SyntaxHighlighter
          language="cpp"
          style={solarizedlight}
          customStyle={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "300px",
            overflow: "auto",
            padding: "10px",
            margin: 0,
            zIndex: 1,
            backgroundColor: "white",
            color: "black",
          }}
          // showLineNumbers={true}
        >
          {code}
        </SyntaxHighlighter>

        {/* Textarea */}
        <textarea
          rows="10"
          cols="50"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write your C++ code here"
          style={{
            position: "relative",
            width: "100%",
            height: "300px",
            padding: "10px",
            fontSize: "16px",
            fontFamily: "monospace",
            backgroundColor: "transparent",
            color: "transparent",
            zIndex: 2,
            caretColor: "black",
            border: "1px solid #ccc",
            resize: "none",
            overflowY: "auto",
          }}
        />
      </div>
      <br />
      <br />
      <h1>Custom Input</h1>
      <textarea
        rows="5"
        cols="50"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Provide your custom input here"
        style={{
          padding: "10px",
          width: "100%",
          fontSize: "16px",
          fontFamily: "monospace",
          marginTop: "10px",
        }}
      />
      <br />
      <br />
      <button
        className="px-8 py-4 rounded-medium border-2 border-blue-400"
        onClick={handleCompile}
      >
        Compile & Run
      </button>
      <button
        className="px-8 py-4 rounded-medium border-2 border-blue-400"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <br />
      <br />
      <h2>Output:</h2>
      <br />
      <pre style={{ background: "lightgray", padding: "10px", color: "black" }}>
        {output}
      </pre>
    </div>
  );
}

export default ArenaCodeEditor;
