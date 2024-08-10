import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Split from 'react-split';
import ArenaCodeEditor from './ArenaCodeEditor';

const Workspace = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/problem/${id}`);
        setProblem(response.data.data);
      } catch (error) {
        console.error('Error fetching problem:', error);
      }
    };

    fetchProblem();
  }, [id]);

  if (!problem) {
    return <div>Loading...</div>;
  }

  return (
    <Split className='split' sizes={[50, 50]} minSize={200} expandToMin={false}>
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-200 mt-12 mb-6">
        {problem.title}
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 whitespace-pre-line">
        {problem.description}
      </p>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Test Cases
        </h2>
        {problem.testCases.map((testCase, index) => (
          <div key={testCase._id} className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Test Case {index + 1}
            </h3>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <strong>Input:</strong> {testCase.input}
            </pre>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mt-2">
              <strong>Output:</strong> {testCase.output}
            </pre>
          </div>
        ))}
      </div>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        <strong>Difficulty:</strong> {problem.difficulty}
      </p>
    </div>
    <ArenaCodeEditor id={id} />
    </Split>
  );
};

export default Workspace;
