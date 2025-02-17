import React, { useState, useEffect } from "react";
import { aStarSolver } from "./AStarSolver";
import "./SlidingPuzzle.css";

const initialTiles = [1, 2, 3, 4, 5, 6, 7, 8, null];

const SlidingPuzzle = () => {
  const [tiles, setTiles] = useState([...initialTiles]);
  const [solving, setSolving] = useState(false);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    shuffleTiles();
  }, []);

  const shuffleTiles = () => {
    if (solving) return;
    let shuffled = [...initialTiles]
      .sort(() => Math.random() - 0.5)
      .filter((tile) => tile !== null);
    shuffled.push(null);
    setTiles(shuffled);
  };

  const moveTile = (index) => {
    if (solving) return;
    const emptyIndex = tiles.indexOf(null);
    const validMoves = [emptyIndex - 3, emptyIndex + 3, emptyIndex - 1, emptyIndex + 1];

    if (validMoves.includes(index)) {
      let newTiles = [...tiles];
      [newTiles[emptyIndex], newTiles[index]] = [newTiles[index], newTiles[emptyIndex]];
      setTiles(newTiles);
    }
  };

  const solvePuzzle = () => {
    if (solving) return;
    setSolving(true);

    // Reset previous steps before solving again
    setSteps([]);
    setCurrentStep(0);

    const solutionPath = aStarSolver(tiles);
    setSteps(solutionPath);
    animateSolution(solutionPath);
  };

  const animateSolution = (solutionPath) => {
    let step = 0;
    const interval = setInterval(() => {
      if (step >= solutionPath.length) {
        clearInterval(interval);
        setSolving(false);
        return;
      }
      setTiles(solutionPath[step].state);
      setCurrentStep(step);
      step++;
    }, 500);
  };

  return (
    <div className="puzzle-container">
      <div className="puzzle-grid">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`tile ${tile === null ? "empty" : ""}`}
            onClick={() => moveTile(index)}
          >
            {tile}
          </div>
        ))}
      </div>
      <button className="shuffle-button" onClick={shuffleTiles} disabled={solving}>
        Shuffle
      </button>
      <button className="solve-button" onClick={solvePuzzle} disabled={solving}>
        Solve with AI
      </button>

      {steps.length > 0 && (
        <div className="solution-info">
          <div>
            <strong>Step {currentStep + 1}</strong>
          </div>
          <div>
            <strong>Heuristic: </strong>{steps[currentStep]?.heuristic || "0"}
          </div>
          <div>
            <strong>Goal State:</strong> [1, 2, 3, 4, 5, 6, 7, 8, null]
          </div>
        </div>
      )}
    </div>
  );
};

export default SlidingPuzzle;
