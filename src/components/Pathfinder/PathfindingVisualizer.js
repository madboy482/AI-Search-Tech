import React, { useState } from "react";
import GridCell from "./GridCell";
import "./PathfindingVisualizer.css";

const rows = 20;
const cols = 40;

const PathfindingVisualizer = () => {
  const [grid, setGrid] = useState(() =>
    Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => "empty")
    )
  );
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [algo, setAlgo] = useState("BFS");
  const [speed, setSpeed] = useState(20);
  const [exploredCount, setExploredCount] = useState(0);
  const [pathLength, setPathLength] = useState(0);
  const [pathTaken, setPathTaken] = useState([]);

  const updateGrid = (row, col, type) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((r, i) =>
        r.map((cell, j) => (i === row && j === col ? type : cell))
      );
      return newGrid;
    });
  };

  const handleCellClick = (rowIndex, colIndex) => {
    if (!start) {
      setStart([rowIndex, colIndex]);
      updateGrid(rowIndex, colIndex, "start");
    } else if (!end) {
      setEnd([rowIndex, colIndex]);
      updateGrid(rowIndex, colIndex, "end");
    } else {
      setGrid((prevGrid) => {
        const newGrid = prevGrid.map((r, i) =>
          r.map((cell, j) =>
            i === rowIndex && j === colIndex
              ? cell === "wall" ? "empty" : "wall"
              : cell
          )
        );
        return newGrid;
      });
    }
  };

  const visualizeAlgorithm = async (algorithm) => {
    if (!start || !end) return;
    let queue = [[...start]];
    let visited = new Set();
    let parent = {};
    let stack = [...queue];
    let explored = 0;

    while ((algorithm === "BFS" ? queue.length : stack.length)) {
      const [r, c] = (algorithm === "BFS" ? queue.shift() : stack.pop());
      if (`${r},${c}` === `${end[0]},${end[1]}`) break;
      if (visited.has(`${r},${c}`)) continue;
      visited.add(`${r},${c}`);
      explored++;
      setExploredCount(explored);

      await new Promise((resolve) => setTimeout(resolve, speed));
      if (grid[r][c] !== "start" && grid[r][c] !== "end")
        updateGrid(r, c, "visited");

      const directions = [
        [0, 1], [1, 0], [0, -1], [-1, 0],
      ];
      for (const [dr, dc] of directions) {
        const nr = r + dr, nc = c + dc;
        if (
          nr >= 0 && nr < rows && nc >= 0 && nc < cols &&
          !visited.has(`${nr},${nc}`) && grid[nr][nc] !== "wall"
        ) {
          algorithm === "BFS" ? queue.push([nr, nc]) : stack.push([nr, nc]);
          if (!parent[`${nr},${nc}`]) parent[`${nr},${nc}`] = `${r},${c}`;
        }
      }
    }

    let path = [];
    let curr = `${end[0]},${end[1]}`;
    while (curr && parent[curr]) {
      const [r, c] = curr.split(",").map(Number);
      path.push([r, c]);
      curr = parent[curr];
    }
    setPathLength(path.length);
    setPathTaken(path.reverse().map(([r, c]) => `(${r},${c})`).join(" → "));

    for (const [r, c] of path) {
      await new Promise((resolve) => setTimeout(resolve, speed));
      if (grid[r][c] !== "start" && grid[r][c] !== "end")
        updateGrid(r, c, "path");
    }
  };

  const startAlgorithm = () => visualizeAlgorithm(algo);

  const resetGrid = () => {
    setGrid(
      Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => "empty")
      )
    );
    setStart(null);
    setEnd(null);
    setExploredCount(0);
    setPathLength(0);
    setPathTaken([]);
  };

  return (
    <div className="visualizer-container">
      <h1>Pathfinding Visualizer</h1>
      <div className="controls">
        <label>Algorithm:</label>
        <select value={algo} onChange={(e) => setAlgo(e.target.value)}>
          <option value="BFS">BFS</option>
          <option value="DFS">DFS</option>
        </select>
        <label>Latency:</label>
        <input 
          type="range" 
          min="20" 
          max="100" 
          value={speed} 
          onChange={(e) => setSpeed(Number(e.target.value))} 
        />
        <span>{speed} ms</span>
        <button onClick={startAlgorithm}>Start {algo}</button>
        <button onClick={resetGrid}>Reset Grid</button>
      </div>
      <div className="grid-container">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} onClick={() => handleCellClick(rowIndex, colIndex)}>
              <GridCell type={cell} />
            </div>
          ))
        )}
      </div>
      <div className="info-panel">
        <p><strong>Explored Nodes:</strong> {exploredCount}</p>
        <p><strong>Path Length:</strong> {pathLength}</p>
        <p><strong>Path Taken:</strong> {pathTaken}</p>
      </div>
      <p className="instructions">
        <strong>Instructions:</strong> Click a cell to set the <span className="cell start-cell">Start</span> (green), then click another to set the <span className="cell end-cell">End</span> (red). Click again to toggle <span className="cell wall-cell">Walls</span> (black). Adjust the speed slider and select an algorithm, then press "Start"!
      </p>
    </div>
  );
};

export default PathfindingVisualizer;