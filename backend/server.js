import express from "express";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import url from "url";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// Resolve __dirname in ES6 modules
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API endpoint for compiling C++ code
app.post("/compile", (req, res) => {
  const code = req.body.code;
  const cppFilePath = path.join(__dirname, "temp.cpp");
  const exeFilePath = path.join(__dirname, "temp"); // Without extension for cross-platform compatibility

  try {
    // Save the code to a temporary file
    fs.writeFileSync(cppFilePath, code);

    // Compile the code using g++
    const compileCommand = `g++ ${cppFilePath} -o ${exeFilePath}`;
    exec(compileCommand, (error, stdout, stderr) => {
      if (error) {
        res.status(400).json({ error: stderr });
        return;
      }

      // Determine the execution command based on the platform
      const runCommand =
        process.platform === "win32" ? `${exeFilePath}.exe` : `${exeFilePath}`;

      exec(runCommand, (runError, runStdout, runStderr) => {
        if (runError) {
          res.status(400).json({ error: runStderr });
        } else {
          res.json({ output: runStdout });
        }

        // Clean up the temporary files
        try {
          fs.unlinkSync(cppFilePath);
          fs.unlinkSync(
            exeFilePath + (process.platform === "win32" ? ".exe" : "")
          );
        } catch (cleanupError) {
          console.error("Cleanup failed:", cleanupError);
        }
      });
    });
  } catch (writeError) {
    res.status(500).json({ error: "Failed to write temporary file" });
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));
