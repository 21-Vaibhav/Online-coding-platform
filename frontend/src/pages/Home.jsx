import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-12">
        Welcome to the Coding Platform
      </h1>
      <div className="flex flex-col space-y-4">
      <button
          onClick={() => navigate("/playground")}
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
        >
          Go to Playground
        </button>
        <button
          onClick={() => navigate("/arena")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
        >
          Go to Arena
        </button>
        <button
          onClick={() => navigate("/battleground")}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
        >
          Go to Battleground
        </button>
      </div>
    </div>
  );
};

export default Home;
