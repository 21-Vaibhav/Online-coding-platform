// src/CustomEditor.js

import React, { useState, useEffect, useRef, useCallback } from "react";

function useViewState() {
  const viewStates = useRef(new Map());

  const saveViewState = (key, viewState) => {
    viewStates.current.set(key, viewState);
  };

  const restoreViewState = (key) => {
    return viewStates.current.get(key);
  };

  return { saveViewState, restoreViewState };
}

function CustomEditor({
  defaultValue = "",
  value,
  language = "cpp",
  theme = "light",
  onChange,
  width = "100%",
  height = "100%",
  className,
  wrapperProps = {},
}) {
  const [code, setCode] = useState(defaultValue);
  const editorRef = useRef(null);
  const { saveViewState, restoreViewState } = useViewState();

  const handleCodeChange = (e) => {
    const newValue = e.target.value;
    setCode(newValue);
    onChange && onChange(newValue);
  };

  const applySyntaxHighlighting = useCallback(() => {
    if (editorRef.current) {
      const code = editorRef.current.value;
      const highlightedCode = highlightCode(code, language);
      editorRef.current.innerHTML = highlightedCode;
    }
  }, [language]);

  useEffect(() => {
    applySyntaxHighlighting();
  }, [code, applySyntaxHighlighting]);

  const highlightCode = (code, language) => {
    if (language === "cpp") {
      return code
        .replace(
          /(int|float|return|if|else|for|while)/g,
          '<span style="color:blue">$1</span>'
        )
        .replace(/(#include\s*<.*?>)/g, '<span style="color:green">$1</span>');
    }
    return code;
  };

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width,
        height,
        backgroundColor: theme === "dark" ? "#282c34" : "#f5f5f5",
        color: theme === "dark" ? "#ffffff" : "#000000",
        padding: "10px",
        fontFamily: "monospace",
        fontSize: "16px",
        overflow: "auto",
        ...wrapperProps.style,
      }}
    >
      <textarea
        ref={editorRef}
        value={code}
        onChange={handleCodeChange}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "transparent",
          color: "transparent",
          caretColor: theme === "dark" ? "#ffffff" : "#000000",
          outline: "none",
          border: "none",
          resize: "none",
          zIndex: 1,
          position: "absolute",
          top: 0,
          left: 0,
          whiteSpace: "pre",
        }}
      />
      <pre
        style={{
          margin: 0,
          zIndex: 0,
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          pointerEvents: "none",
          overflow: "hidden",
        }}
        dangerouslySetInnerHTML={{ __html: highlightCode(code, language) }}
      />
    </div>
  );
}

export default CustomEditor;
