import React from "react";
import { useNavigate } from "react-router-dom";
import SlidingPuzzle from "../components/AIPuzzle/SlidingPuzzle";

const SlidingPuzzlePage = () => {
  const navigate = useNavigate();  // Hook to handle navigation

  const handleGoBack = () => {
    navigate("/");  // Navigates back to the pathfinding visualizer
  };

  return (
    <div>
      <h1>Sliding Puzzle (8-Puzzle AI Solver)</h1>
      <SlidingPuzzle />
      <button className="go-back-button" onClick={handleGoBack}>
        Go Back to Pathfinding Visualizer
      </button>
    </div>
  );
};

export default SlidingPuzzlePage;
