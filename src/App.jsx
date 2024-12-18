import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import IncomeCalculator from "./components/IncomeCalculator";
import Authors from "./components/Authors";
import Methodology from "./components/Methodology";

const App = () => {
  return (
    <Router>
      {/* Navbar across all pages */}
      <Navbar />

      {/* Route Definitions */}
      <Routes>
        <Route path="/" element={<IncomeCalculator />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/methodology" element={<Methodology />} />
      </Routes>
    </Router>
  );
};

export default App;
