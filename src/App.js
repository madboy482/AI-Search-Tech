import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PathfindingVisualizerPage from "./pages/PathfindingVisualizerPage";
import SlidingPuzzlePage from "./pages/SlidingPuzzlePage";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="navbar">
        <Link to="/puzzle" className="ai-puzzle-button">AI Puzzle</Link>
      </div>

      <Routes>
        <Route path="/" element={<PathfindingVisualizerPage />} />
        <Route path="/puzzle" element={<SlidingPuzzlePage />} />
      </Routes>
    </Router>
  );
};

export default App;
