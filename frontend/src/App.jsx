import React from "react";
import {Routes, Route} from 'react-router-dom'
import Playground from "./pages/Playground";
import Arena from "./pages/Arena";
import Home from "./pages/Home";
import BattleGround from "./pages/BattleGround";
import Workspace from "./components/Workspace";

function App() {

  const problemId = "two-sum";
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/playground" element={<Playground />} />
      <Route path="/arena" element={<Arena />} />
      <Route path="/battleground" element={<BattleGround />} />
      <Route path="/workspace" element={<Workspace problemId={problemId} />} />
    </Routes>
  );
}

export default App;
