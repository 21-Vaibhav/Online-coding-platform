import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function CodeEditor() {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const textareaRef = useRef(null);
  const highlighterRef = useRef(null);

  // Handle code changes
  const handleChange = (e) => {
    setCode(e.target.value);
  };

  // Compile code and handle response
  const handleCompile = async () => {
    try {
      const response = await axios.post("http://localhost:3001/compile", {
        code,
        input,
      });

      const { output, compileTime, executionTime, memoryUsage } = response.data;

      // Format the output to include compile time, execution time, and memory usage
      const formattedOutput = `Output:
${output}

Compile Time: ${compileTime} ms
Execution Time: ${executionTime} ms
Memory Usage: ${memoryUsage.toFixed(2)} MB`;

      setOutput(formattedOutput);
    } catch (error) {
      const errorOutput = `
Error:
${error.response ? error.response.data.error : "Unknown error"}

Compile Time: N/A
Execution Time: N/A
Memory Usage: N/A`;

      setOutput(errorOutput);
    }
  };

  // Sync scrolling between textarea and highlighted code
  useEffect(() => {
    const textarea = textareaRef.current;
    const highlighter = highlighterRef.current;

    const syncScroll = () => {
      if (highlighter && textarea) {
        highlighter.scrollTop = textarea.scrollTop;
      }
    };

    if (textarea) {
      textarea.addEventListener("scroll", syncScroll);
    }

    return () => {
      if (textarea) {
        textarea.removeEventListener("scroll", syncScroll);
      }
    };
  }, []);

  // Basic syntax highlighting function
const highlightCode = (code) => {
  // Escape special HTML characters
  code = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const keywords =
    /\b(alignas|alignof|and|and_eq|asm|auto|bitand|bitor|bool|break|case|catch|char|char16_t|char32_t|cin|cout|std|class|compl|concept|const|consteval|constexpr|const_cast|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|false|float|for|friend|goto|if|inline|int|long|mutable|namespace|new|noexcept|not|not_eq|nullptr|operator|or|or_eq|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|true|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while|xor|xor_eq|main)\b/g;

  const libraries =
    /\b(iostream|iomanip|fstream|sstream|vector|map|set|unordered_map|unordered_set|algorithm|cmath|cstring|cstdio|cstdlib|cassert|limits|numeric|iterator|functional|utility)\b/g;

  const strings = /(".*?"|'.*?')/g;
  const comments = /(\/\/.*?$|\/\*[\s\S]*?\*\/)/gm;

  return code
    .replace(comments, '<span style="color: green;">$&</span>')
    .replace(strings, '<span style="color: red;">$&</span>')
    .replace(libraries, '<span style="color: teal;">$&</span>') // Highlight libraries in teal
    .replace(keywords, '<span style="color: blue;">$&</span>');
};



  return (
    <div style={{ padding: "20px" }}>
      <h1>C++ Code Playground</h1>
      <br />
      <div style={{ position: "relative", width: "100%" }}>
        {/* Highlighted Code */}
        <pre
          ref={highlighterRef}
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "300px",
            overflowY: "scroll",
            padding: "10px",
            margin: 0,
            zIndex: 1,
            backgroundColor: "white",
            color: "black",
            whiteSpace: "pre-wrap",
            pointerEvents: "none",
          }}
          dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
        />

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          rows="10"
          cols="50"
          value={code}
          onChange={handleChange}
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

export default CodeEditor;
