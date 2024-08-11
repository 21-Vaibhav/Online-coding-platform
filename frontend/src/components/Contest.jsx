import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Contest = () => {
  const { name } = useParams(); // Get the contest ID from the route parameters
  const [contest, setContest] = useState(null);
  const [problemsDetails, setProblemsDetails] = useState([]); // State to store problem details

  useEffect(() => {
    const fetchContest = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/battleground/${name}`);
        const data = response.data.data;
        setContest(data);
        
        // Extract problem IDs into a string array
        const ids = data.problems.map(problem => problem.id);

        // Fetch details for each problem
        const fetchProblemsDetails = async () => {
          try {
            const detailsPromises = ids.map(problemId =>
              axios.get(`http://localhost:3001/problem/${problemId}`)
            );
            const results = await Promise.all(detailsPromises);
            
            // Debugging logs
            console.log("Problem details fetched:", results.map(result => result.data.data));

            setProblemsDetails(results.map(result => result.data.data));
          } catch (error) {
            console.error("Error fetching problem details:", error);
          }
        };

        fetchProblemsDetails();
      } catch (error) {
        console.error("Error fetching contest details:", error);
      }
    };

    fetchContest();
  }, [name]); // Re-fetch the contest if the ID changes

  if (!contest) {
    return <p className="text-center text-gray-600">Loading contest details...</p>; // Display a loading message or spinner
  }

  return (
    <div className="container mx-auto p-8 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">{contest.name}</h1>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Problems</h2>
        <table className="min-w-full divide-y divide-gray-300 bg-white rounded-lg shadow-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Difficulty
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {problemsDetails.map((problem) => (
              <tr key={problem.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-700">
                  <Link
                    to={`/workspace/${problem.id}`}
                    state={{ probleID: "two-sum" }}
                    className="text-blue-500 hover:underline"
                  >
                    {problem.title}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {problem.difficulty}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contest;
