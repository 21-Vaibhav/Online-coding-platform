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

  // Sort the contests array by start time
  const sortedContests = [...contests].sort(
    (a, b) => new Date(a.startTime) - new Date(b.startTime)
  );

  return (
    <>
      <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-200 mt-12 mb-6">
        Available Contests
      </h1>
      <div className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedContests.map((contest) => (
          <div
            key={contest.name}
            className="bg-black border border-gray-200 rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-semibold text-blue-500">
              <Link to={`/contest/${contest.name}`} className="hover:underline">
                {contest.name}
              </Link>
            </h2>
            <p className="text-gray-400 mt-2">{contest.description}</p>
            <div className="mt-4">
              <p>
                <strong>Start Time:</strong>{" "}
                {new Date(contest.startTime).toLocaleString()}
              </p>
              <p>
                <strong>End Time:</strong>{" "}
                {new Date(contest.endTime).toLocaleString()}
              </p>
              <p className="mt-2">
                <strong>Status:</strong>{" "}
                {new Date(contest.startTime) > new Date()
                  ? "Upcoming"
                  : new Date(contest.endTime) < new Date()
                  ? "Ended"
                  : "Ongoing"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ContestTable;
