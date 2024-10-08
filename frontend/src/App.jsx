import React from "react";
import {Routes, Route} from 'react-router-dom'
import Playground from "./pages/Playground";
import Arena from "./pages/Arena";
import Home from "./pages/Home";
import BattleGround from "./pages/BattleGround";
import Workspace from "./components/Workspace";
import Contest from "./components/Contest" 
import AddProblem from "./components/AddProblem";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/playground" element={<Playground />} />
      <Route path="/arena" element={<Arena />} />
      <Route path="/battleground" element={<BattleGround />} />
      <Route path="/workspace/:id" element={<Workspace />} />
      <Route path="/contest/:name" element={<Contest />} />
      <Route path="/addproblem" element={<AddProblem />} /> 
    </Routes>
  );
}

export default App;
