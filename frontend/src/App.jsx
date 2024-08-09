import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Playground from "./components/Playground";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/playground" element={<Playground />} />
    </Routes>
  );
};

export default App;
