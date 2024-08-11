import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProblemTable = () => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get("http://localhost:3001/problemList/");
        setProblems(response.data.data);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchProblems();
  }, []);

  // Sort the problems array by the 'order' field
  const sortedProblems = [...problems].sort((a, b) => a.order - b.order);

  return (
    <>
      <div className="container mx-auto p-6">
        {/* Add Problem Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-200 mt-12">
            Problems to Solve
          </h1>
          <Link to="/addproblem">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
              Add Problem
            </button>
          </Link>
        </div>
        <table className="min-w-full bg-black border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="border px-6 py-3 text-left">Order</th>
              <th className="border px-6 py-3 text-left">Title</th>
              <th className="border px-6 py-3 text-left">Difficulty</th>
              <th className="border px-6 py-3 text-left">Category</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            {sortedProblems.map((problem) => (
              <tr
                key={problem.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="border px-6 py-4">{problem.order}</td>
                <td className="border px-6 py-4">
                  <Link
                    to={`/workspace/${problem.id}`}
                    state={{ probleID: "two-sum" }}
                    className="text-blue-500 hover:underline"
                  >
                    {problem.title}
                  </Link>
                </td>
                <td className="border px-6 py-4">{problem.difficulty}</td>
                <td className="border px-6 py-4">{problem.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProblemTable;
