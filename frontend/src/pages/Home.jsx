import React from "react";
import { useNavigate } from "react-router-dom";

/// develp on hover feature

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <h1 className="text-4xl font-bold text-gray-100 mb-12">
        Welcome to   <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-pulse">
          Coding Backwards
        </span>
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
