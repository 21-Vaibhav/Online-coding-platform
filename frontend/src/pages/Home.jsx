import React from "react";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div>
      <h1>Welcome to the Coding Platform</h1>
      <nav>
        <ul>
          <li>
            <Link to="/playground">Playground</Link>
          </li>
          <li>
            <Link to="/arena">Arena</Link>
          </li>
          <li>
            <Link to="/battleground">Battleground</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
