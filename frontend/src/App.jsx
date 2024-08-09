import React from "react";
import {Routes, Route} from 'react-router-dom'
import Playground from "./pages/Playground";
import Arena from "./pages/Arena";
import Home from "./pages/Home";
import BattleGround from "./pages/BattleGround";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/playground" element={<Playground />} />
      <Route path="/arena" element={<Arena />} />
      <Route path="/battleground" element={<BattleGround />} />
    </Routes>
  );
}

export default App;
