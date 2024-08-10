import express from "express";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import url from "url";

const router = express.Router();

// Resolve __dirname in ES6 modules
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API endpoint for compiling C++ code
router.post("/", (req, res) => {
  const code = req.body.code;
  const input = req.body.input;
  const cppFilePath = path.join(__dirname, "temp.cpp");
  const exeFilePath = path.join(__dirname, "temp"); // Without extension for cross-platform compatibility
  const tempInputFilePath = path.join(__dirname, "tempInput.txt");

  try {
    // Save the code to a temporary file
    fs.writeFileSync(cppFilePath, code);

    // Save the input to a temporary file
    fs.writeFileSync(tempInputFilePath, input);

    // Compile the code using g++
    const compileCommand = `g++ ${cppFilePath} -o ${exeFilePath}`;

    const startCompile = process.hrtime();

    exec(compileCommand, (error, stdout, stderr) => {
      const [compileSeconds, compileNanoseconds] = process.hrtime(startCompile);
      const compileTime = (
        compileSeconds * 1000 +
        compileNanoseconds / 1e6
      ).toFixed(2);

      if (error) {
        res.status(400).json({ error: stderr, compileTime });
        return;
      }

      // Determine the execution command based on the platform
      const runCommand =
        process.platform === "win32"
          ? `${exeFilePath}.exe < ${tempInputFilePath}`
          : `${exeFilePath} < ${tempInputFilePath}`;

      const startRun = process.hrtime();

      exec(runCommand, (runError, runStdout, runStderr) => {
        const [runSeconds, runNanoseconds] = process.hrtime(startRun);
        const executionTime = (
          runSeconds * 1000 +
          runNanoseconds / 1e6
        ).toFixed(2);

        if (runError) {
          res
            .status(400)
            .json({ error: runStderr, compileTime, executionTime });
        } else {
          res.json({
            output: runStdout,
            compileTime,
            executionTime,
            memoryUsage: process.memoryUsage().heapUsed / 1024 / 1024, // Memory usage in MB
          });
        }

        // Clean up the temporary files
        try {
          fs.unlinkSync(cppFilePath);
          fs.unlinkSync(tempInputFilePath);
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

export default router;
