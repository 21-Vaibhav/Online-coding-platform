import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ContestTable = () => {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get("http://localhost:3001/battleground");
        setContests(response.data.data);
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
    };

    fetchContests();
  }, []);

  // Sort the contests array by start date (assuming start date is a timestamp)
  const sortedContests = [...contests].sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate)
  );

  return (
    <>
      <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-200 mt-12 mb-6">
        Available Contests
      </h1>
      <div className="container mx-auto p-6">
        <table className="min-w-full bg-black border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="border px-6 py-3 text-left">Contest Name</th>
              <th className="border px-6 py-3 text-left">Start Date</th>
              <th className="border px-6 py-3 text-left">End Date</th>
              <th className="border px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            {sortedContests.map((contest) => (
              <tr
                key={contest.name}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="border px-6 py-4">
                  <Link
                    to={`/contest/${contest.name}`}
                    className="text-blue-500 hover:underline"
                  >
                    {contest.name}
                  </Link>
                </td>
                <td className="border px-6 py-4">
                  {new Date(contest.startDate).toLocaleString()}
                </td>
                <td className="border px-6 py-4">
                  {new Date(contest.endDate).toLocaleString()}
                </td>
                <td className="border px-6 py-4">
                  {new Date(contest.startDate) > new Date()
                    ? "Upcoming"
                    : new Date(contest.endDate) < new Date()
                    ? "Ended"
                    : "Ongoing"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ContestTable;
