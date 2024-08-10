import express from "express";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import url from "url";

const router = express.Router();

// Resolve __dirname in ES6 modules
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.post('/', async (req, res) => {
  const code = req.body.code;
  const testCases = req.body.testCases; // Array of test cases
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

      // Function to run a test case
      const runTestCase = (input, expectedOutput) => {
        return new Promise((resolve, reject) => {
          const tempInputFilePath = path.join(__dirname, `tempInput_${Date.now()}.txt`);
          fs.writeFileSync(tempInputFilePath, input);

          // Determine the execution command based on the platform
          const runCommand =
            process.platform === "win32"
              ? `${exeFilePath}.exe < ${tempInputFilePath}`
              : `${exeFilePath} < ${tempInputFilePath}`;

          exec(runCommand, (runError, runStdout, runStderr) => {
            // Clean up the temporary input file
            fs.unlinkSync(tempInputFilePath);

            if (runError) {
              reject(runStderr);
            } else {
              // Compare the actual output with the expected output
              const passed = runStdout.trim() === expectedOutput.trim();
              resolve({ passed, output: runStdout.trim(), expectedOutput });
            }
          });
        });
      };

      // Run all test cases in sequence
      const runAllTestCases = async () => {
        const results = [];
        for (const testCase of testCases) {
          const result = await runTestCase(testCase.input, testCase.output);
          results.push(result);
        }
        return results;
      };

      runAllTestCases()
        .then(results => {
          res.json({ results });
        })
        .catch(runError => {
          res.status(400).json({ error: runError });
        })
        .finally(() => {
          // Clean up the compiled executable
          const exeFile = exeFilePath + (process.platform === "win32" ? ".exe" : "");
          if (fs.existsSync(exeFile)) {
            fs.unlinkSync(exeFile);
          }
          if (fs.existsSync(cppFilePath)) {
            fs.unlinkSync(cppFilePath);
          }
        });
    });
  } catch (writeError) {
    res.status(500).json({ error: "Failed to write temporary file" });
  }
});

export default router;
